import mammoth from "mammoth";
import * as htmlPdf from "html-pdf-node";
import { JSDOM } from "jsdom";

/**
 * Converts a Docx buffer to a PDF buffer, preserving formatting.
 * @param docxBuffer Buffer containing the Docx file
 * @returns Promise<Buffer> PDF buffer
 */
export async function docxBufferToPdfBuffer(docxBuffer: Buffer): Promise<Buffer> {
  // Convert Docx buffer to HTML using mammoth
  const { value: html } = await mammoth.convertToHtml({ buffer: docxBuffer });

  // Optionally, use jsdom to clean up or manipulate HTML if needed
  const dom = new JSDOM(html);
  const htmlContent = dom.window.document.documentElement.outerHTML || html;

  // Convert HTML to PDF using html-pdf-node (CommonJS default export)
  const pdfBuffer: Buffer = await htmlPdf.generatePdf({ content: htmlContent }, { format: 'A4' });

  return pdfBuffer;
}

// Export for API usage
export default docxBufferToPdfBuffer;
