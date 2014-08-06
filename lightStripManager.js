// functionality to control lightstrips
function LightStrip(L, ledsPerMeter) {
	var thisStrip = {
		L : L,
		ledsPerMeter : ledsPerMeter,
		numLeds : Math.round(L * ledsPerMeter),
		defaultLedColor: {r: 0, g: 0, b: 0},
		allLeds : [],
		Led : function(rgbColor) {
			var thisLed = {
				state : 'off',
				rgbColor: rgbColor,
				toggle : function() {
					if (thisLed.state === 'off') {
						thisLed.state = 'on'
					} else {
						state = 'off'
					}
				},
				turnOn : function() {
					thisLed.state = 'on';
				},
				turnOff : function() {
					thisLed.state = 'off';
				},
				setRgbColor : function(rgbColor) {
					thisLed.rgbColor = rgbColor;
				},
				getPosition : function() {
					var ledNumber = thisStrip.allLeds.indexOf(thisLed);
					return 1.0 / ledsPerMeter * ledNumber;
				}
			}
			return thisLed;
		},
		makeLeds : function() {
			for (var i=0; i<thisStrip.numLeds; i++) {
				var newLed = thisStrip.Led(thisStrip.defaultLedColor);
				thisStrip.allLeds.push(newLed);
			}
		},
		allOn : function() {
			for (var i=0; i<thisStrip.allLeds.length; i++) {
				thisStrip.allLeds[i].turnOn();
			}
		},
		allOff : function() {
			for (var i=0; i<thisStrip.allLeds.length; i++) {
				thisStrip.allLeds[i].turnOff();
			}
		},
		// updateLeds can have one of many functions uncommented.
		updateLeds : function(tube) {
			//testUpdateTubeWithSingleDrop(tube, thisStrip);
			updateTubeWithSingleDrop(tube, thisStrip);
		}
	}
	thisStrip.makeLeds();
	thisStrip.allOn();
	return thisStrip;
}

// Helper Functions
function normalDistribution(x, mu, sig, metersPerLed) {
	var c = 1.0 / (sig*Math.sqrt(2 * Math.PI));
	var exp = -1.0*(Math.pow((x - mu),2) / (2 * Math.pow(sig,2)));
	return Math.max(c*Math.pow(Math.E, exp)*metersPerLed, 1.0); // TODO - this should be an integral, not just f(x) * dx
}

function quadraticDimmer(dropToLEDDistance, dropSize) {
	return Math.pow((dropToLEDDistance / dropSize), 2);
}
function cubicDimmer(dropToLEDDistance, dropSize) {
	return Math.pow((dropToLEDDistance / dropSize), 3);
}
function exponentialDimmer(dropToLEDDistance, dropSize) {
	return Math.exp(Math.abs(dropToLEDDistance) / dropSize);
}
function gaussianDimmer(dropToLEDDistance, dropSize) {
	return Math.exp(Math.pow(dropToLEDDistance/dropSize, 2));
}

function addRgbColors(rgb1, rgb2, weight) {
	return {
		r: rgb1.r + weight * rgb2.r,
		g: rgb1.g + weight * rgb2.g,
		b: rgb1.b + weight * rgb2.b
	}
}
function normalizeRgb(rgb, totalWeight) {
	return {
		r : (rgb.r / totalWeight),
		g : (rgb.g / totalWeight),
		b : (rgb.b / totalWeight)
	}
}
function dimRgb(rgb, dimFactor){
	var dimmed = {
		r: (rgb.r * dimFactor),
		g: (rgb.g * dimFactor),
		b: (rgb.b * dimFactor)
	}
	return dimmed;
}
function amplifyRgb(rgb, ampFactor){
	return dimRgb(rgb, 1.0/ampFactor);
}
function randomColor() {
	return {
		r: 255*Math.random(),
		g: 255*Math.random(),
		b: 255*Math.random()
	}
}