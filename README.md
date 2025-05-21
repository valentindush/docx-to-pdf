# Docx to PDF Converter

This project provides a Node.js solution (TypeScript, Bun) to convert a Docx buffer to a PDF buffer without using LibreOffice. The conversion preserves the original formatting of the Docx file.

## Usage

- Import the main function and pass a Docx buffer to receive a PDF buffer in return.
- No LibreOffice or external office suite required.

## API Usage

You can run the API server to convert `.docx` files to PDF via HTTP:

### Start the API server

```
bun run src/api.ts
```

The server will start on [http://localhost:3000](http://localhost:3000).

### Endpoints

- `POST /convert` — Upload a `.docx` file (form field: `file`), receive a PDF file in response.
- `GET /api-docs` — Swagger UI for API documentation and testing.

#### Example cURL request

```
curl -X POST -F "file=@yourfile.docx" http://localhost:3000/convert --output converted.pdf
```

## Development

- Built with TypeScript and Bun.
- To install dependencies: `bun install`
- To build: `bun run build`
- To test: `bun run test`

## Implementation

- Uses open-source libraries to parse Docx and render as PDF.
- Ensures high fidelity to original formatting.

---

For more details, see the source code and comments.
