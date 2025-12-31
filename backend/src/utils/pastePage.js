import { escapeHtml } from "./escapeHtml.js";

export function renderPasteHTML(paste) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Paste</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; }
          pre { background: #f4f4f4; padding: 1rem; }
        </style>
      </head>
      <body>
        <h1>Your Paste</h1>
        <pre>${escapeHtml(paste.content)}</pre>
      </body>
    </html>
  `;
}

export function renderErrorHTML(message) {
  return `
    <html>
    <head>
        <title>Error</title>
        <style>
          h2{ color: red; text-align: center; position: relative; top: 40vh; }
        </style>
      </head>
      <body>
        <h2>${message}</h2>
      </body>
    </html>
  `;
}
