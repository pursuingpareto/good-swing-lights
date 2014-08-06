
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
	}
	thisStrip.makeLeds();
	thisStrip.allOn();
	return thisStrip;
}