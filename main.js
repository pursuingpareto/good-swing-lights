var dt =0.05; // 40 updates per second
var ls = LightStrip(4.0, 60.0);
var tube = Tube(ls);
var actuator = HTMLActuator(ls);
actuator.actuate();
function update() {
	tube.updateDrops();
	ls.updateLeds(tube);
	actuator.update();
}

var newId = window.setTimeout(stop, 10000);

