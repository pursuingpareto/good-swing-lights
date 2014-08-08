var PAUSED = false;

var timeoutId;
var togglePlay = function() {
	if (PAUSED) {

	} else {

		window.clearInterval(timeoutID);
	}
}
// var playPauseButton = document.getElementById('play/pause');
// playPauseButton.onclick = (function() {
// 	togglePlay();
// 	if (PAUSED) {
// 		PAUSED = false;
// 	} else {
// 		PAUSED = true}
// })
var swingButton = document.getElementById('SWING');
swingButton.onclick = function() {
	SWING.KE += SWING.energyIncrementPerSwing;
	SWING.PE = SWING.mass * g * SWING.h();
	SWING.omega = SWING.getOmegaFromKE();
}