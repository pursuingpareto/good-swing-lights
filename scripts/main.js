var model = new DROP_MODEL()
var ls = LightStrip(4.0, 60.0);
var tube = model.Tube(ls);
var swing = new Swing(tube.L*0.75);
var actuator = HTMLActuator(ls, swing);
actuator.actuate();
function update() {
	tube.updateDropPositions();
	model.updateLightingModel(tube, ls);
	swing.updatePhysics();
	actuator.update(ls, swing);
	COUNTER += 1;
}

var newId = window.setTimeout(stop, 10000);

