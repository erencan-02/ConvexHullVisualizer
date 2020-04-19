
function CreateNewPoint(canvas, event) { 
	let rect = canvas.getBoundingClientRect(); 

	//offset:10, due to mouse position
	let x = event.clientX - 10; 
	let y = event.clientY - 10; 

	//add new Point
	var newPoint = new Point(x, y);
	points.push(newPoint);

	//make html object
	var node = document.createElement("div"); 
	node.className = "point"
	node.style.left = x + "px";
	node.style.top = y + "px";

	document.body.append(node); 

	//add to dictionary for "cross" access
	point_html.set(newPoint, node);
	html_point.set(node, newPoint);
	latestAction = newPoint;

	AnimatePoint(node);
	UpdatePointCounters();
} 

//current option: delete node
var selectedNode = null;
function OpenNodeMenu(node){
	selectedNode = node

	let canvas = document.getElementById("sandbox").getBoundingClientRect();
	var x = html_point.get(node).x + 30;
	var y = html_point.get(node).y - canvas.top - 10;

	//dont add context menu to html DOM
	//take existing element and enable it on certain position
	var contextmenu = document.getElementById("context-menu");

	contextmenu.style.left = x + "px";
	contextmenu.style.top = y + "px";
	contextmenu.className = "dropdown open";
}

function CloseNodeMenu(){
	var contextmenu = document.getElementById("context-menu");
	contextmenu.className = "dropdown";
}

function DeleteNode(){
	var point = html_point.get(selectedNode);

	//redraw if hull-1 > 2
	if(selectedNode.className == "point-hull"){
		//remove from points list 
		//points.splice( points.indexOf(point), 1);
		hull.splice( hull.indexOf(point), 1);

		//remove from WeakMap
		html_point.delete(selectedNode);
		point_html.delete(point);
		$(selectedNode).remove();
		points.splice( points.indexOf(point), 1);
		//when hull without that point is possible -> make new one
		if(points.length + hull.length  >= 3){
			Visualize();
		}
		else{
			$('.line').remove();
			var leftover_points = document.querySelectorAll(".point-hull");
			for(var i = 0; i<leftover_points.length; i++){
				leftover_points[i].setAttribute("class", "point");
				points.push(html_point.get(leftover_points[i]));
				hull = [];
			}
		}
	}
	else{
		//remove node from DOM
		selectedNode.remove();

		//remove from points list 
		points.splice( points.indexOf(point), 1);

		//remove from WeakMap
		html_point.delete(selectedNode);
		point_html.delete(point);
	}

	UpdatePointCounters();
}

function UpdatePointCounters(){
	var count_points = $('.point').length;
	var count_pointsHull = $('.point-hull').length;

	changeTotalPointCount(count_points + count_pointsHull);
	changeTotalHullCount(count_pointsHull);
}

//LISTENER: right-click
document.addEventListener('contextmenu',function(e){
	//disables contextmenu
	e.preventDefault()

	//right click on a node to open contextmenu
	if(e.target && (e.target.className == 'point' || e.target.className == 'point-hull')){
		OpenNodeMenu(e.target);
	}
	else{
		CloseNodeMenu();
	}
});

//LISTENER: left-click
document.addEventListener('click',function(e){
	//right click on a node to open contextmenu
	if(e.target && e.target.id == 'sandbox' && e.which == 1){
		CreateNewPoint(document.getElementById("sandbox"), event); 
		CloseNodeMenu();
	}
	else{
		CloseNodeMenu();
	}
});


//LISTENER: key press
$(document).keydown(function(e) {
	//esc
	if (e.keyCode === 27) skipTutorial(); 
	if (e.ctrlKey && e.keyCode == 89) removeHull(); //ctrl + x
	if (e.ctrlKey && e.keyCode == 88) clearNodes(); //ctrl + y
	if (e.ctrlKey && e.keyCode == 90) undo();
	if (e.ctrlKey && e.keyCode == 66) Visualize();
	if (e.keyCode == 72) openTutorial();
	if (e.keyCode == 82) randomPoints();

	//Tutorial menu
	if(e.keyCode == 39) changePage(1);
	if(e.keyCode == 37) changePage(-1);

 	//Algorithm selection
  	if(e.keyCode == 49) setStartButtonValue("Gift Wrapping");
	if(e.keyCode == 50) setStartButtonValue("Graham Scan");
	if(e.keyCode == 51) setStartButtonValue("Quickhull");
	if(e.keyCode == 52) setStartButtonValue("DAC");
	if(e.keyCode == 53) setStartButtonValue("Monotone Chain");
	if(e.keyCode == 54) setStartButtonValue("Chan\'s Algorithm");
});






