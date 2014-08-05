function updateTubeWithSingleDrop(tube, lightStrip) {
	// iterate over all the leds
	thisStrip = lightStrip
	var led, ledPosition, totalContribution, ledColor;
	for (var i=0; i<thisStrip.numLeds; i++) {
		led = thisStrip.allLeds[i];
		ledPosition = led.getPosition();
		totalContribution = 1;
		ledColor = dimRgb(led.rgbColor, 1.2)
		// get contribution to this LED from each drop
		for (var j=0; j<tube.allDrops.length; j++) {
			var drop = tube.allDrops[j];
			var dropContributionCoefficient = drop.brightness * normalDistribution(ledPosition, drop.position, drop.size, 1.0/thisStrip.ledsPerMeter);
			ledColor = addRgbColors(ledColor, drop.rgbColor, dropContributionCoefficient);
			totalContribution += dropContributionCoefficient;
		}
		var newColor = normalizeRgb(ledColor, totalContribution)
		led.setRgbColor(newColor);
	}
}