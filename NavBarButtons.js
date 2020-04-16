
//no click required
function CreateAutoPoint(x, y){
	//animate counter
	changeTotalPointCount(1);
	
	var newPoint = new Point(x, y);
	points.push(newPoint);

	//make html object
	var node = document.createElement("div"); 
	node.className = "point"
	node.style.left = x + "px";
	node.style.top = y + "px";
	//node.style.zIndex = "30";


	document.body.append(node);  //append to canvas bug: z-axis

	//add to dictionary for acess later on
	point_html.set(newPoint, node);
	html_point.set(node, newPoint);
}

function clearNodes(){
	//remove html objects
	$('.point').remove();
	$('.point-hull').remove();
	$('.line').remove();

	//animate counter
	changeTotalPointCount(-points.length);
	changeHullCount(0);

	//remove from list
	html_point = new WeakMap();
	point_html = new WeakMap();
	points = [];
}

function removeHull(){
	$('.line').remove();
	var hull_points = $('.point-hull');
	for(var i = 0; i<hull_points.length; i++){
		hull_points[i].setAttribute("class", "point");
		points.push(html_point.get(hull_points[i]));
		hull = [];
	}
}

function randomPoints(){
	var n = 20;
	let canvas = document.getElementById("sandbox").getBoundingClientRect();
	let offset = 100;
	//boundaries
	x_min = canvas.left + offset;
	x_max = canvas.left + canvas.width -2* offset;

	y_min = canvas.top + 0.5*offset;
	y_max = canvas.top + canvas.height - 2*offset;

	for(var i = 0; i<n; i++){
		var pos_x = Math.random() * x_max + x_min;
		var pos_y = Math.random() * y_max + y_min;
		CreateAutoPoint(pos_x, pos_y);
	}
}