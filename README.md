# Docx to PDF Converter

This project provides a Node.js solution (TypeScript, Bun) to convert a Docx buffer to a PDF buffer without using LibreOffice. The conversion preserves the original formatting of the Docx file.

## Usage

- Import the main function and pass a Docx buffer to receive a PDF buffer in return.
- No LibreOffice or external office suite required.

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
