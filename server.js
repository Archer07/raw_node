var http = require('http'),
      fs = require('fs');

// helper function to abstract the logic of serving static files from the logic of the server

function serveStatic(res, path, contentType, responseCode) {
	if (!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err, data){
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode, {'Content-Type':contentType});
			res.end(data);
		}
	});

	
}

http.createServer(function(req, res){
	// normalize url by removing querystring, optional
	// trailing slash, and making lowercase

	var path = req.url.replace('/\/?(?:\?.*)?$/', '').toLowerCase();
	switch (path) {
		case '':
			serveStatic(res, 'public/home.html', 'text/html');
			break;
		case '/about':
			serveStatic(res, 'public/about.html', 'text/html');
			break;

		case '/img/logo.jpg':
			serveStatic(res, 'public/img/logo.jpg', 'image/jpeg');
			break;
		default:
			serveStatic(res, 'public/notfound.html', 'text/html', 404);
			break;
	}
}).listen(5000);

console.log('Server is listening on port 5000');
