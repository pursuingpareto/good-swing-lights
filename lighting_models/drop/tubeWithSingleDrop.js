function updateTubeWithSingleDrop(tube, LightStrip) {
	// iterate over all the leds
	thisStrip = LightStrip;
	halfLife = 0.5; // used for dimming (seconds)
	dimFactor = Math.exp(((Math.log(0.5)*dt)/halfLife));
	console.log(dimFactor);
	var led, ledPosition, totalContribution, ledColor;
	for (var i=0; i<thisStrip.numLeds; i++) {
		led = thisStrip.allLeds[i];
		ledPosition = led.getPosition();
		// This variable is VERY important for dimming rate!
		totalContribution = 1.0; // weight 1 comes from existing color
		ledColor = dimRgb(led.rgbColor, dimFactor);
		// get contribution to this LED from each drop
		for (var j=0; j<tube.allDrops.length; j++) {
			var drop = tube.allDrops[j];
			//var dropContributionCoefficient = drop.brightness * normalDistribution(ledPosition, drop.position, drop.size, 1.0/thisStrip.ledsPerMeter);
			// var dropContributionCoefficient = drop.brightness / (quadraticDimmer(ledPosition - drop.position, drop.size) + 0.00000001);
			// var dropContributionCoefficient = drop.brightness / exponentialDimmer(ledPosition - drop.position, drop.size);
			var dropContributionCoefficient = drop.brightness / gaussianDimmer(ledPosition - drop.position, drop.size);
			ledColor = addRgbColors(ledColor, drop.rgbColor, dropContributionCoefficient);
			totalContribution += dropContributionCoefficient;
		}
		var newColor = normalizeRgb(ledColor, totalContribution);
		led.setRgbColor(newColor);
	}
}

function testUpdateTubeWithSingleDrop(tube, LightStrip) {
	thisStrip = LightStrip;
	led = thisStrip.allLeds[20]
	led.turnOn();
	led.setRgbColor({r: 255, g: 255, b:255});
}