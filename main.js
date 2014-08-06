var dt =0.05; // 20 updates per second
var ls1 = LightStrip(4.0, 60.0);
var ls2 = LightStrip(4.0, 60.0);
var tube1 = Tube(ls1);
var tube2 = Tube(ls2);
var lightStrips = [ls1, ls2]
var actuator = HTMLActuator(lightStrips);
actuator.actuate();
function update() {
	tube1.updateDrops();
	tube2.updateDrops();
	ls1.updateLeds(tube1);
	ls2.updateLeds(tube1);
	console.log(actuator.LightStrips);
	actuator.update();
}

var newId = window.setTimeout(stop, 10000);

