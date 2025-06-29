// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

http.createServer((req, res) => {
	let filePath = '.' + req.url;
	if (filePath === './') filePath = './index.html';

	const extname = path.extname(filePath);
	let contentType = 'text/html';

	switch (extname) {
		case '.js': contentType = 'text/javascript'; break;
		case '.css': contentType = 'text/css'; break;
		case '.json': contentType = 'application/json'; break;
		case '.png': contentType = 'image/png'; break;
		case '.jpg': contentType = 'image/jpg'; break;
		case '.mp4': contentType = 'video/mp4'; break;
		case '.vtt': contentType = 'text/vtt'; break;
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			res.writeHead(404);
			res.end(`File not found: ${filePath}`);
		} else {
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content, 'utf-8');
		}
	});

}).listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
