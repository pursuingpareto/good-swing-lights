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
				var kickAssAngle = 55.0 // where the magic happens!
				r = 127.5 + 127.5*Math.cos(Math.abs(toRadians( 2*(ledPosition - thisStrip.L/2)/thisStrip.L*12*(kickAssAngle - Math.abs(toDegrees(Swing.theta))))));
				g = 127.5 + 127.5*Math.cos(Math.abs(toRadians( 2*(ledPosition - thisStrip.L/2)/thisStrip.L*18*(kickAssAngle - Math.abs(toDegrees(Swing.theta))))));
				b = 127.5 + 127.5*Math.cos(Math.abs(toRadians( 2*(ledPosition - thisStrip.L/2)/thisStrip.L*24*(kickAssAngle - Math.abs(toDegrees(Swing.theta))))));

				led.setRgbColor({r:r, g:g, b:b});
			}

		}
	}
	return thisModel
}




