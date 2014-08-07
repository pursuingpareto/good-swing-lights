// These constants control drop behavior.
var DROP_MODEL = function() {
	// user-specified drop properties
	var	dropsPerSecond  = 3.0;
	var	dropSize		= 0.03;  // in meters
	var	dropPosition 	= 0.0;   // drop starts at top of tube
	var	dropSpeed		= 1.5;   // meters / second
	var	dropBrightness	= 1.0;
	var	halfLife		= 0.2;   // specifies duration of trail
	var	lightPersistence= 0.1;   // Defines how much an LED considers its previous color when updating color.
	var maxRgbValue     = 255;   // maybe you could change this based on swing speed?
	var colorPalette    = palettes.flouresceMe;
	// calculated drop properties
	// var	dropProbability = dropsPerSecond * dt;
	var	dimFactor 		= Math.exp(((Math.log(0.5) * dt) / halfLife));
	var framesPerDrop   = Math.round(fps / dropsPerSecond);
	// var getDropProbability = function() {
	// 	var dropsPerSecond = Math.abs(toDegrees(SWING.theta) / 3.0);
	// 	return dropsPerSecond * dt;
	// }
	var getDropProbability = function() {
		var dropsPerSecond = 250 * Math.pow(SWING.calcKE() / SWING.maxEnergy, 2);
		return dropsPerSecond * dt;
	}
	var thisModel = {
		// A Drop is a single light entity (NOT a single LED)
		// which travels down the A-frame poles.
		Drop : function(rgbColor, Tube) {
			var thisDrop = {
				rgbColor  		: rgbColor,
				size 			: dropSize, // used to calculate brightness on other pixels.
				position 		: dropPosition,
				speed 			: dropSpeed, // m/s
				brightness 		: dropBrightness,
				destroy 		: function() {
					var i = Tube.allDrops.indexOf(thisDrop);
					Tube.allDrops.splice(i, 1);
				},
				updatePosition 	: function() {
					thisDrop.position += thisDrop.speed * dt;
					if (thisDrop.position > Tube.L) {
						thisDrop.destroy();
					}
				}
			}
			return thisDrop;
		},

		// A Tube should be thought of as a continuous tube of light
		// attached to the side of an A-frame pole.
		Tube : function(LightStrip) {
			var thisTube = {
				L : LightStrip.L,
				allDrops : [],
				updateDropPositions : function() {
					for (var i=0; i<thisTube.allDrops.length; i++) {
						drop = thisTube.allDrops[i];
						drop.updatePosition();
					}
					dropProbability = getDropProbability();
					// if (COUNTER % framesPerDrop < 1) {
					// 	newDrop = thisModel.Drop(randomBrightColor(maxRgbValue), thisTube);
					// 	thisTube.allDrops.push(newDrop)
					// }

					if (Math.random() < dropProbability) {
						newDrop = thisModel.Drop(getColorFromPalette(colorPalette), thisTube);
						thisTube.allDrops.push(newDrop)
					}
				}
			}
			return thisTube;
		},
		// Mandatory function for all lightingModels. This takes
		// the model's current lighting state and converts it to
		// RGB values for each LED in the lightstrip.
		updateLightingModel : function(tube, LightStrip, Swing) {
			thisStrip = LightStrip;
			var led, ledPosition, totalWeight, ledColor;

			// iterate over all the LEDs
			for (var i=0; i<thisStrip.numLeds; i++) {
				led = thisStrip.allLeds[i];
				ledPosition = led.getPosition();
				ledColor = dimRgb(led.rgbColor, dimFactor);
				// This variable is VERY important for dimming rate!
				totalWeight = lightPersistence;

				// find the contribution to this LED from EVERY drop
				for (var j=0; j<tube.allDrops.length; j++) {
					var drop = tube.allDrops[j];
					var dropWeight = drop.brightness / gaussianDimmer(Math.abs(ledPosition - drop.position) + drop.size/10.0, drop.size);
					ledColor = addRgbColors(ledColor, drop.rgbColor, totalWeight, dropWeight);
					totalWeight += dropWeight;
				}
				//var newColor = normalizeRgb(ledColor, totalWeight);
				led.setRgbColor(ledColor);
			}
		}
	}
	return thisModel
}




