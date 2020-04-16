var points = new Array();
let hull = new Array();

//based on the situation
//access html element with point object or
//access point object with html object
var point_html = new WeakMap();
var html_point = new WeakMap();

class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

function ConnectHull(){
	for(var i = 0; i<hull.length - 1; i++){
		connectTwoPoints(hull[i+1], hull[i]);
	}
	connectTwoPoints(hull[hull.length-1], hull[0]);
}
