var g = 9.8;
var toRadians = function(angle) {
	return angle * Math.PI / 180.0;
}
var toDegrees = function(angle) {
	return angle * 180.0 / Math.PI;
}
function Swing(L) {
	this.theta = toRadians(60.0),
	this.omega = 0.0,
	this.alpha = 0.0,
	this.PE    = 0.0,
	this.KE    = 0.0,
	this.TE    = 0.0,
	this.mass  = 1.0,
	this.L     = L,
	this.maxTheta   = toRadians(80.0),
	this.maxHeight  = this.L * (1 - Math.cos(this.maxTheta)),
	this.maxEnergy  = this.maxHeight * g * this.mass
}
Swing.prototype.calcTheta = function() {
	return this.theta + this.omega * dt;
}
Swing.prototype.calcOmega = function() {
	return this.omega + this.alpha * dt;
}
Swing.prototype.calcAlpha = function() {
	return -g * Math.sin(this.theta) / Math.pow(this.L, 2);
}
Swing.prototype.calcPE = function() {
	return this.mass * g * this.h();
}
Swing.prototype.calcKE = function() {
	return 0.5 * this.mass * Math.pow(this.v(), 2);
}
Swing.prototype.calcTE = function() {
	return this.calcPE() + this.calcKE();
}
Swing.prototype.h = function() {
	return this.L * (1 - Math.cos(toRadians(this.theta)));
}
Swing.prototype.v = function() {
	return this.omega * this.L;
}
Swing.prototype.updatePhysics = function() {
	this.alpha = this.calcAlpha();
	this.omega = this.calcOmega();
	this.theta = this.calcTheta();
	this.PE    = this.calcPE();
	this.KE    = this.calcKE();
	this.TE    = this.calcTE();
}
Swing.prototype.getOmegaFromTE = function() {
	var KE = this.TE - this.calcPE();
	return Math.pow((2*KE) / (this.mass * L*L),0.5);
}

// TESTING BELOW
// var mySwing = new Swing(3.0);
// console.log(mySwing);
// console.log(mySwing.omega);
// mySwing.theta = 30.0;
// mySwing.alpha = mySwing.calcAlpha();
// console.log(mySwing.alpha);