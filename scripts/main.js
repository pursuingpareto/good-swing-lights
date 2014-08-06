var model = new DROP_MODEL()
var ls = LightStrip(4.0, 60.0);
var tube = model.Tube(ls);
var actuator = HTMLActuator(ls);
actuator.actuate();
function update() {
	tube.updateDropPositions();
	model.updateLightingModel(tube, ls);
	actuator.update(ls);
}

var newId = window.setTimeout(stop, 10000);

