
function addToHull(point){
	point_html.get(point).className = "point-hull";
}

function connectTwoPoints(p1, p2){
	MakeNewPath(p1, p2);
}

function disconnectTwoPoints(line){
	DeleteNewPath(line);
}

function changeTotalPointCount(total){
	anime({
	  targets: '#totalPoints',
	  value: [0, total],
	  round: 1,
	  easing: 'easeInOutExpo',
	  duration: 1000
	});
}

function changeTotalHullCount(total){
	anime({
	  targets: '#totalHullPoints',
	  value: [0, total],
	  round: 1,
	  easing: 'easeInOutExpo',
	  duration: 1000
	});
}

function AnimateLine(pathElement){
	var speed;
	switch(currentSelectedSpeed){
		case 'Super Sonic':
			speed = 0;
			break;
		case 'Fast':
			speed = 500;
			break;
		case 'Average':
			speed = 2000;
			break;
		case 'Slow':
			speed = 4000;
			break;
	}
	var lineDrawing = anime({
		targets: pathElement,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: speed,
		delay: function(el, i) { return i * 500 },
		direction: 'alternate',
		loop: false
    });

    setTimeout(function(){ return }, 3000);
}

function MakeNewPath(p1, p2){
	var svg_container = document.getElementById("path-container");
	var newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

	var x1 = p1.x + 10;
	var y1 = p1.y + 12;
	var x2 = p2.x + 10;
	var y2 = p2.y + 12;

	var path_d = "M " + x1 + "," + y1 + " L " + x2 + "," + y2;

	//set path attributes
	newPath.setAttribute("class", "line");
	newPath.setAttribute("d", path_d);
	newPath.setAttribute("fill", "green");
	newPath.setAttribute("stroke", "gray");

	svg_container.append(newPath); 
	AnimateLine(newPath);
}

function AnimatePoint(node){
	anime({
  		targets: node,
  		delay: -400,
  		scale: [1, 1.3, 1],
  		duration: 800,
  		easing: 'easeInOutQuad',
  		direction: 'alternate',
  		loop: false
	});
}
