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
		document.getElementById("actualStartButton").innerHTML = "Pick an Algorithm";
		return;
	}

	if($('.point').length < 3){
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
    		case "Chan\'s Algorithm":
    			ConvexHull_ChansAlgorithm();
    			break;
		default:
    			break;
	}
	UpdatePointCounters();
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
	UpdatePointCounters();
}

function DisableButtons(){
	document.getElementById("actualStartButton").style.backgroundColor = "#b90f0f";

	//algorithms dropdown menu
	var dropdown_elements = document.getElementById("algorithms-dropdown-menu").childNodes;
}

function EnableButtons(){
	document.getElementById("actualStartButton").style.backgroundColor = "#1abc9c";
}
