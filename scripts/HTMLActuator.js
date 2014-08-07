var fps = 20.0;
var dt = 1.0 / fps;
var COUNTER = 0;

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
var setSwing = function(Swing) {
	var chain = document.getElementById('chain');
		var theta = toDegrees(Swing.theta);
		chain.style.webkitTransform = 'rotate('+theta+'deg)';
		chain.style.webkitTransform = 'rotate('+theta+'deg)';
	    chain.style.mozTransform    = 'rotate('+theta+'deg)';
	    chain.style.msTransform     = 'rotate('+theta+'deg)';
	    chain.style.oTransform      = 'rotate('+theta+'deg)';
	    chain.style.transform       = 'rotate('+theta+'deg)';
}
var HTMLActuator = function(LightStrip, Swing){
	var thisActuator = {
		actuate : function() {
			makeLEDs(LightStrip);
			setSwing(Swing)
		},
		update : function(LightStrip, Swing) {
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
			var chain = document.getElementById('chain');
			var theta = toDegrees(Swing.theta);
			chain.style.webkitTransform = 'rotate('+theta+'deg)';
			chain.style.webkitTransform = 'rotate('+theta+'deg)';
		    chain.style.mozTransform    = 'rotate('+theta+'deg)';
		    chain.style.msTransform     = 'rotate('+theta+'deg)';
		    chain.style.oTransform      = 'rotate('+theta+'deg)';
		    chain.style.transform       = 'rotate('+theta+'deg)';
		}
	}
	return thisActuator;
}
