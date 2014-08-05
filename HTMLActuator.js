var makeLED = function(containerElement, i) {
	var newLight = document.createElement("div");
	newLight.className += "LED";
	newLight.setAttribute('id','LED-'+String(i));
	containerElement.appendChild(newLight);;
}
var makeLEDs = function(LightStrip) {
	var poles = document.getElementsByClassName('pole');
	console.log(poles.length);
	var numLEDs = LightStrip.allLeds.length;
	console.log('numLEDs is ' + String(numLEDs));
	for (var poleIndex=0; poleIndex<poles.length; poleIndex++){
		var pole = poles[poleIndex];
		console.log(pole);
		for (var i=0; i<numLEDs; i++) {
			makeLED(pole, i);
		}
	}
}
var HTMLActuator = function(LightStrip){
	var thisActuator = {
		actuate : function() {
			console.log('actuating...');
			makeLEDs(LightStrip);
		},
		update : function() {
			var lights = document.getElementsByClassName('LED');
			for (var i=0; i<lights.length; i++) {
				var lightElement = document.getElementById('LED-'+String(i))
				var led = LightStrip.allLeds[i];
				// hacky toggler
				if (led.state === 'off') {
					lightElement.classList.toggle('on', false);
					lightElement.classList.toggle('off', true)
				} else {
					lightElement.classList.toggle('on', true)
					lightElement.classList.toggle('off', false);
				}
				// console.log('updating led number:');
				// console.log(i);
				// console.log('with rgbColor:');
				var rgb = led.rgbColor;
				// console.log(rgb);
				var rgbString = 'rgb('+String(rgb.r)+','+String(rgb.g)+','+String(rgb.b)+')';
				// console.log(rgbString);
				// console.log('element is...');
				// console.log(lightElement);
				lightElement.style.backgroundColor = rgbString;
			}
		}
	}
	return thisActuator;
}
