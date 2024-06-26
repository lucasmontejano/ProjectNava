const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  let contentType = 'text/html';

  if (filePath.endsWith('.js')) {
    contentType = 'text/javascript';
  } else if (filePath.endsWith('.css')) {
    contentType = 'text/css';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {

        res.writeHead(404);
        res.end('File not found');
      } else {

        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
