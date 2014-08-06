var dt =0.1; // 10 updates per second
var ls = LightStrip(1.5, 60.0);
var tube = Tube(ls);
function update() {
	tube.updateDropPositions();
	ls.updateLeds(tube);
	console.log('RGB VALUE OF allLeds[2] IS...')
	console.log(ls.allLeds[60].rgbColor);
	for (var i=0; i<tube.allDrops.length; i++) {
		console.log('  there is a drop at position:');
		console.log(tube.allDrops[i].position);
	}
	console.log();
}
var timeoutId = window.setInterval(update, dt*1000);
function stop() {
	window.clearInterval(timeoutId);
}
var newId = window.setTimeout(stop, 4000);