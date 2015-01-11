
function getFibonacci(n) {
	var a = 0;
	var b = 1;
	var c = 0;
	
	if (n == 0) return 0;
	for (var i=0; i<n; i++) {
		c = a + b;
		a = b;
		b = c;
	} 
	return c;
}

self.addEventListener('message', function(e) {
	console.log('finding fibonacci for ' + e.data);
	var result = getFibonacci(e.data);
	self.postMessage(result);
});