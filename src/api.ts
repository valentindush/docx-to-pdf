import express, { Request, Response } from "express";
import multer from "multer";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { docxBufferToPdfBuffer } from "./index";

const app = express();
const upload = multer();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Docx to PDF Converter API",
    version: "1.0.0",
    description: "API to convert uploaded .docx files to PDF, preserving formatting.",
  },
  servers: [
    { url: "http://localhost:3000", description: "Local server" }
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/api.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * @swagger
 * /convert:
 *   post:
 *     summary: Convert a DOCX file to PDF
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
app.post("/convert", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  try {
    const pdfBuffer = await docxBufferToPdfBuffer(req.file.buffer);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=converted.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: "Conversion failed", details: (err as Error).message });
  }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
