var rgbify = function(rval,gval,bval){
	return {r: rval,
			g: gval,
			b: bval}
}
var palettes = {
	giantGoldfish    : [rgbify(105, 210, 231), rgbify(167, 219, 216), rgbify(224, 228, 204), rgbify(243, 134, 48),rgbify(250, 105, 0)],
	thoughtProvoking : [rgbify(236, 208, 120), rgbify(217, 91, 67), rgbify(192, 41, 66), rgbify(84, 36, 55), rgbify(83, 119, 122)],
	cheerUp		     : [rgbify(85, 98, 112), rgbify(78, 205, 196), rgbify(199, 244, 100), rgbify(255, 107, 107), rgbify(196, 77, 88)],
	danceLights		 : [rgbify(250, 122, 250), rgbify(196, 160, 243), rgbify(160, 223, 243), rgbify(126, 255, 251), rgbify(122, 250, 189)],
	flouresceMe		 : [rgbify(14, 255, 252), rgbify(54, 255, 39), rgbify(255, 253, 38), rgbify(250, 100, 23), rgbify(255, 38, 34)]
}
