var g = 9.8;
var fps = 30.0;
var dt = 1000.0 / fps;
var toRadians = function(angle) {
	return angle * Math.PI / 180.0;
}

function Swing(L) {
	this.theta = 0.0,
	this.omega = 0.0,
	this.alpha = 0.0,
	this.PE    = 0.0,
	this.KE    = 0.0,
	this.TE    = 0.0,
	this.mass  = 1.0,
	this.L     = L
}
Swing.prototype.calcTheta = function() {
	return this.omega + this.omega * dt;
}
Swing.prototype.calcOmega = function() {
	return this.omega + this.alpha * dt;
}
Swing.prototype.calcAlpha = function() {
	return -g * Math.sin(toRadians(this.theta)) / this.L;
}
Swing.prototype.calcPE = function() {
	return this.mass * g * this.h();
}
Swing.prototype.calcKE = function() {
	return 0.5 * this.mass * Math.pow(this.v(), 2);
}
Swing.prototype.calcTE = function() {
	return this.calcPE + this.calcKE;
}
Swing.prototype.h = function() {
	return this.L * (1 - Math.cos(toRadians(this.theta)));
}
Swing.prototype.v = function() {
	return this.omega * this.L;
}

// TESTING BELOW
// var mySwing = new Swing(3.0);
// console.log(mySwing);
// console.log(mySwing.omega);
// mySwing.theta = 30.0;
// mySwing.alpha = mySwing.calcAlpha();
// console.log(mySwing.alpha);