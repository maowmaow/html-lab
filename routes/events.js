
exports.get = function(req, res) {
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	
	var i = 0;
	var msgInterval = null;
	msgInterval = setInterval(function() {
		res.write('data: Hello world ' + (++i));
		res.write('\n\n');
	}, 1000);
	
	var evInterval = null;
	evInterval = setInterval(function() {
		res.write('event: news\n');
		res.write('data: news update ' + i);
		res.write('\n\n');
	}, 2000);

	req.addListener('close', function() {
		clearInterval(msgInterval);
		clearInterval(evInterval);
		res.end();
	}, false);
};