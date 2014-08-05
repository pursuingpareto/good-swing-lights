function Tube(LightStrip) {
	var thisTube = {
		L : LightStrip.L,
		defaultColor : randomColor(),
		allDrops : [],
		Drop : function(rgbColor) {
			var thisDrop = {
				rgbColor : rgbColor,
				size : 0.3, // used to calculate brightness on other pixels.
				position : thisTube.L,
				speed : 2.5, // m/s
				brightness : 1.0,
				destroy : function() {
					var i = thisTube.allDrops.indexOf(thisDrop);
					thisTube.allDrops.splice(i, 1);
				},
				updatePosition : function() {
					thisDrop.position -= thisDrop.speed * dt;
					if (thisDrop.position < 0.0) {
						thisDrop.destroy();
					}
				}
			}
			return thisDrop;
		},
		updateDrops : function() {
			if (thisTube.allDrops.length < 1) {
				newDrop = thisTube.Drop(randomColor());
				thisTube.allDrops.push(newDrop)
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