
function cross(a, b, o) {
   //return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
   return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
}

function ConvexHull_MonotoneChain() {
	let sorted_by_x = points.sort((a,b) => a.x - b.x);
  	var lower = [];
  	hull = [];

	points = []
	var nodes = $('.point');
	for(var i = 0; i<nodes.length; i++){
		points.push(html_point.get(nodes[i]));
	}
  
	for (var i = 0; i < sorted_by_x.length; i++) {
		while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], sorted_by_x[i]) <= 0) {
			lower.pop();
		}
	lower.push(sorted_by_x[i]);
	}

	var upper = [];
	for (var i = sorted_by_x.length - 1; i >= 0; i--) {
		while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], sorted_by_x[i]) <= 0) {
			upper.pop();
		}
	upper.push(sorted_by_x[i]);
	}

	upper.pop();
	lower.pop();
	
	hull = lower.concat(upper);


	hull.forEach(el => point_html.get(el).className = "point-hull");
	ConnectHull();
	changeHullCount(hull.length);
	isRunning = false;
	EnableButtons();
}