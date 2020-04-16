alert("BUGS: update counter | clean code");

let isRunning = false;

function Visualize(){
	//all points get resetted: point-hull -> point
	//points array reset
	//WeakMaps are not modified
	Reset();

	if(isRunning){
		return;
	}

	//check for errors

	if(currentSelected == ""){
		//error: nothing selected
		alert("Please select an Algorithm to continue");
		return;
	}

	if(points.length < 3){
		alert("You need at least 3 points to make a Convex Hull");
		return;
	}


	//false when algorithm is finished
	//set false by Algorithm function itself (not here)
	isRunning = true;

	//navbar buttons get red
	DisableButtons();


	switch(currentSelected) {
		case "Gift Wrapping":
			ConvexHull_GiftWrapping();
    		break;
		case "Graham Scan":
			ConvexHull_GrahamScale();
    		break;
    	case "Quickhull":
    		ConvexHull_Quickhull();
    		break;
		case "DAC":
			ConvexHull_DAC();
    		break;
		case "Monotone Chain":
			ConvexHull_MonotoneChain();
    		break;
    	case "ChansAlgorithm":
    		ConvexHull_ChansAlgorithm();
    		break;
		default:
    		break;
	}
}

function Reset(){
	//make hull points -> normal points
	var hullpoints = document.querySelectorAll(".point-hull");
	for(var i = 0; i<hullpoints.length; i++){
		hullpoints[i].setAttribute("class", "point");
		points.push(html_point.get(hullpoints[i]));
	}

	//delete lines
	$('.line').remove();

	//reset counters
	//changeTotalPointCount(-points.length);
	changeHullCount(0);

}

function DisableButtons(){
	document.getElementById("actualStartButton").style.backgroundColor = "#b90f0f";

	//algorithms dropdown menu
	var dropdown_elements = document.getElementById("algorithms-dropdown-menu").childNodes;
	console.log(dropdown_elements);
}

function EnableButtons(){
	document.getElementById("actualStartButton").style.backgroundColor = "#1abc9c";

}