var dt =0.1; // 40 updates per second
var ls = LightStrip(1.5, 60.0);
var tube = Tube(ls);
var actuator = HTMLActuator(ls);
actuator.actuate();
function update() {
	tube.updateDrops();
	ls.updateLeds(tube);
	actuator.update();
}
var timeoutId = window.setInterval(update, dt*1000);
function stop() {
	window.clearInterval(timeoutId);
}
var newId = window.setTimeout(stop, 2000);