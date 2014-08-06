function Tube(LightStrip) {
	var thisTube = {
		L : LightStrip.L,
		defaultColor : randomColor(),
		allDrops : [],
		Drop : function(rgbColor) {
			var thisDrop = {
				rgbColor : rgbColor,
				size : 0.1, // used to calculate brightness on other pixels.
				position : 0.0,
				speed : 2.5, // m/s
				brightness : 10.0,
				destroy : function() {
					var i = thisTube.allDrops.indexOf(thisDrop);
					thisTube.allDrops.splice(i, 1);
				},
				updatePosition : function() {
					thisDrop.position += thisDrop.speed * dt;
					if (thisDrop.position > thisTube.L) {
						thisDrop.destroy();
					}
				}
			}
			return thisDrop;
		},
		updateDrops : function() {
			if (thisTube.allDrops.length < 1) {
				newDrop = thisTube.Drop({r: 0, g: 255, b: 0});
				thisTube.allDrops.push(newDrop)
				console.log('new drop pushed!')
			} else {
				for (var i=0; i<thisTube.allDrops.length; i++) {
					drop = thisTube.allDrops[i];
					drop.updatePosition();
					}
				}
			}
		}
		return thisTube;
	}