// Helper Functions

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
function addRgbColors(rgb1, rgb2, weight1, weight2) {
	return {
		r: (weight1 * rgb1.r + weight2 * rgb2.r) / (weight1 + weight2),
		g: (weight1 * rgb1.g + weight2 * rgb2.g) / (weight1 + weight2),
		b: (weight1 * rgb1.b + weight2 * rgb2.b) / (weight1 + weight2)
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