#!/usr/bin/env node
// Zero-dependency static server for local preview:  node tools/serve.js  →  http://localhost:5173
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT) || 5173;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".pdf": "application/pdf",
  ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json",
};

http
  .createServer((req, res) => {
    let file = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!file.startsWith(root)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    fs.readFile(file, (err, buf) => {
      if (err) return res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
      res.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream" }).end(buf);
    });
  })
  .listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
