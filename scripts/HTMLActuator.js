var fps = 30;
var dt = 1.0 / 30.0;

var makeLED = function(containerElement, i, poleIndex) {
	var newLight = document.createElement("div");
	newLight.className += "LED ";
	newLight.className += "LED-"+String(i);
	newLight.setAttribute('id','LED-'+String(poleIndex)+'-'+String(i));
	containerElement.appendChild(newLight);;
}
var makeLEDs = function(LightStrip, poleIndex) {
	var poles = document.getElementsByClassName('pole');
	var numLEDs = LightStrip.allLeds.length;
	for (var poleIndex=0; poleIndex<poles.length; poleIndex++){
		var pole = poles[poleIndex];
		for (var i=0; i<numLEDs; i++) {
			makeLED(pole, i, poleIndex);
		}
	}
}
var roundRgb = function(rgb){
	return {
		r: Math.round(rgb.r),
		g: Math.round(rgb.g),
		b: Math.round(rgb.b)
	}
}
var HTMLActuator = function(LightStrip){
	var thisActuator = {
		actuate : function() {
			makeLEDs(LightStrip);
		},
		update : function(LightStrip) {
			var pole = document.getElementById('pole-0')
			var lights = pole.getElementsByClassName('LED');
			for (var i=0; i<lights.length; i++) {
				var lightElements = document.getElementsByClassName('LED-'+String(i));
				var led = LightStrip.allLeds[i];
				for (var j=0; j<lightElements.length; j++) {
					lightElement = lightElements[j];
					// hacky toggler
					if (led.state === 'off') {
						lightElement.classList.toggle('on', false);
						lightElement.classList.toggle('off', true)
					} else {
						lightElement.classList.toggle('on', true)
						lightElement.classList.toggle('off', false);
					}
					var rgb = roundRgb(led.rgbColor);
					var rgbString = 'rgb('+String(rgb.r)+','+String(rgb.g)+','+String(rgb.b)+')';
					lightElement.style.backgroundColor = rgbString;
				}
			}
		}
	}
	return thisActuator;
}
