var CLUSTER_SIZE = 6;

var clusterStates = {
	black: function(LED) {
		LED.rgbColor = {r:0, g:0, b:0};
	},
	white: function(LED) {
		LED.rgbColor = {r:255, g:255, b:255};
	},
	red: function(LED) {
		LED.rgbColor = {r:255, g:0, b:0};
	},
	blue: function(LED) {
		LED.rgbColor = {r:0, g:0, b:255};
	},
	gold: function(LED) {
		LED.rgbColor = {r:255, g:185, b:0};
	}
}
var makeClusters = function(ls, clusterSize) {
	var clusters = [];
	console.log('making clusters');
	for (var i=0; i<(ls.allLeds.length / CLUSTER_SIZE); i++) {
		var newCluster = [];
		for (var j=0; j<(CLUSTER_SIZE); j++) {
			newCluster.push(ls.allLeds[i*CLUSTER_SIZE + j]);
		}
		clusters.push(newCluster);
	}
	return clusters
}

var staticPatterns = {
	stateSetter : function(ls) {
		console.log('stateSetter called');
		var blinkFrequency = 8; // blinks per second
		var duration = 3.0; // seconds
		var framesPerBlink = Math.round(fps / blinkFrequency);
		var startTime = COUNTER;
		var endTime = startTime + duration*fps;
		var numBlinks = Math.round((duration * fps) / framesPerBlink);
		thisPattern = {
			CLUSTERS : makeClusters(ls, CLUSTER_SIZE),
			isOver : function() {
				return (COUNTER > endTime) ? true : false;
			},
			blinkNumber : 0,
			setState : function(LED, stateFunction) {
				stateFunction(LED);
			},
			blink : function() {
				for (var i=0; i<thisPattern.CLUSTERS.length; i++) {
					var cluster = thisPattern.CLUSTERS[i];
					if ((i + this.blinkNumber) % 2 == 0) {
						for (var j=0; j<cluster.length; j++){
							var LED = cluster[j];
							this.setState(LED, clusterStates.gold);
						}
					} else {
						for (var j=0; j<cluster.length; j++){
							var LED = cluster[j];
							this.setState(LED, clusterStates.white);
						}
					}
				}
			},
			decideToBlink : function(){
				if ((COUNTER - startTime) % framesPerBlink == 0) {
					thisPattern.blink();
					thisPattern.blinkNumber += 1;
				}
			}
		}

		return thisPattern;
	}
}

