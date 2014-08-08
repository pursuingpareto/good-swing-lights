// These constants control drop behavior.
var DROP_MODEL = function() {
	var thisModel = {
		// Need this because updateLightingModel takes it as a param for some reason
		Tube : function(LightStrip) {
			var thisTube = {
				L : LightStrip.L,
				allDrops : [],
				updateDropPositions : function() {
				}
			}
			return thisTube;
		},
		// Mandatory function for all lightingModels. This takes
		// the model's current lighting state and converts it to
		// RGB values for each LED in the lightstrip.
		updateLightingModel : function(tube, LightStrip, Swing) {
			thisStrip = LightStrip;
			var led, ledPosition, totalWeight, ledColor, r, g, b;

			// iterate over all the LEDs
			for (var i=0; i<thisStrip.numLeds; i++) {
				led = thisStrip.allLeds[i];
				ledPosition = led.getPosition();
				ledColor = led.rgbColor;

				r = 127.5 + 127.5*Math.sin( ledPosition*Swing.theta);
				g = 127.5 + 127.5*Math.sin( ledPosition*2*Swing.theta );
				b = 127.5 + 127.5*Math.sin( ledPosition*4*Swing.theta );

				led.setRgbColor({r:r, g:g, b:b});
			}

		}
	}
	return thisModel
}




