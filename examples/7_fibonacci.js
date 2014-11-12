
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

// add your code here...

