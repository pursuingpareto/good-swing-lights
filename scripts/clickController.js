var PAUSED = true;
var advanceButton = document.getElementById('advance');
advanceButton.onclick = update;
var advance10Button = document.getElementById('advance-10');
advance10Button.onclick = (function() {
	for (i=0;i<10;i++){
		update();
	}
});
var timeoutId;
var togglePlay = function() {
	if (PAUSED) {
		timeoutID = window.setInterval(update, dt*1000)
	} else {

		window.clearInterval(timeoutID);
	}
}
var playPauseButton = document.getElementById('play/pause');
playPauseButton.onclick = (function() {
	togglePlay();
	if (PAUSED) {
		PAUSED = false;
	} else {
		PAUSED = true}
})
var swingButton = document.getElementById('SWING');
swingButton.onclick = function() {
	SWING.TE += SWING.energyIncrementPerSwing;
}