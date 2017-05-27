var http = require('http'),
      fs = require('fs');

function serveStatic(res, path, contentType, responseCode) {
	if (!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err, data){
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode, {'Content-Type':contentType)};
			res.end(data);
		}
	});

	
}

http.createServer(function(req, res){
	// normalize url by removing querystring, optional
});
