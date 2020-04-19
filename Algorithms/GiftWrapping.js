
function getVector(p1, p2){
	let vector = [];
	vector.push(p2.x - p1.x);
	vector.push(p1.y - p2.y); //reversed because of html coordinates
	return vector;
}

function crossProduct(a, b){
	//a,b as arrays not objects
	return a[0] * b[1] - a[1] * b[0];
}

function findMaxCrossProductPoint(p, pointSet){
	var comparePoint = pointSet[0];

	for(var i = 1; i<pointSet.length; i++){
		//connectTwoPoints(pointSet[i], p);
		if(crossProduct( getVector(p, comparePoint), getVector(p, pointSet[i])) >= 0){
			comparePoint = pointSet[i];
		}
		else{
			//delete line
		}
	}
	return comparePoint;
}

function ConvexHull_GiftWrapping(){
	points = []
	var nodes = $('.point');
	for(var i = 0; i<nodes.length; i++){
		points.push(html_point.get(nodes[i]));
	}

	hull = [];
	let sorted_points = points.sort((a,b) => a.x - b.x);
	
	//leftmost point is in hull
	hull.push(sorted_points[0]);

	while(nxtPoint != hull[0]){
		//find leftmost point of latest hullpoint
		var nxtPoint = findMaxCrossProductPoint(hull[hull.length-1], sorted_points);
		hull.push(nxtPoint);

		//change classname for colorchange
		addToHull(nxtPoint);

		//pop new hullpoint ou of point set 
		sorted_points.splice( sorted_points.indexOf(hull[hull.length-1]), 1);
	}

	//the first hullpoint is added twice LOL
	hull.pop();

	hull.forEach(el => point_html.get(el).className = "point-hull");
	ConnectHull();
	isRunning = false;
	EnableButtons();
}

