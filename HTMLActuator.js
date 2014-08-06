var makeLED = function(containerElement, i, poleIndex) {
	var newLight = document.createElement("div");
	newLight.className += "LED ";
	newLight.className += "LED-"+String(poleIndex);
	newLight.setAttribute('id','LED-'+String(poleIndex)+'-'+String(i));
	containerElement.appendChild(newLight);;
}
var makeLEDs = function(LightStrip, poleIndex) {
	var pole = document.getElementById('pole-'+String(poleIndex));
	var numLEDs = LightStrip.allLeds.length;
	for (var i=0; i<numLEDs; i++) {
		makeLED(pole, i, poleIndex);
	}
}
var roundRgb = function(rgb){
	return {
		r: Math.round(rgb.r),
		g: Math.round(rgb.g),
		b: Math.round(rgb.b)
	}
}
var HTMLActuator = function(LightStrips){
	console.log(LightStrips[0]);
	var thisActuator = {
		LightStrips : LightStrips,
		actuate : function() {
			console.log('actuating...');
			makeLEDs(LightStrips[0], 0);
			makeLEDs(LightStrips[1], 1);
		},
		update : function(LightStrips) {
			for (poleIndex=0;poleIndex<2;poleIndex++){
				var lights = document.getElementsByClassName('LED-'+String(poleIndex));
				var LightStrip = thisActuator.LightStrips[poleIndex];
				for (var i=0; i<lights.length; i++) {
					var lightElement = document.getElementById('LED-'+String(poleIndex)+'-'+String(i))
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
					var rgb = roundRgb(led.rgbColor);
					// console.log(rgb);
					var rgbString = 'rgb('+String(rgb.r)+','+String(rgb.g)+','+String(rgb.b)+')';
					// console.log(rgbString);
					// console.log('element is...');
					// console.log(lightElement);
					lightElement.style.backgroundColor = rgbString;
				}
			}
		}
	}
	return thisActuator;
}
