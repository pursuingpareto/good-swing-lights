var model = new DROP_MODEL()
var ls = LightStrip(4.0, 60.0);
var tube = model.Tube(ls);
var SWING = new Swing(tube.L*0.75);
var actuator = HTMLActuator(ls, SWING);
actuator.actuate();
function update() {
	tube.updateDropPositions(SWING);
	model.updateLightingModel(tube, ls, SWING);
	SWING.updatePhysics();
	actuator.update(ls, SWING);
	COUNTER += 1;
}

var newId = window.setTimeout(stop, 10000);

