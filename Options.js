var currentSelected = "";
var currentSelectedSpeed = "";
setSpeedButtonValue("Average");

function setStartButtonValue(algorithmName){
	if(isRunning){
		return;
	}
	
	startButton = document.getElementById("actualStartButton");
	startButton.firstChild.data = "Visualize " + algorithmName;
	currentSelected = algorithmName;
}

function setSpeedButtonValue(option){
	if(isRunning){
		return;
	}
	
	speedOption = document.getElementById("adjustSpeed");
	speedOption.firstChild.data = "Speed: " + option;
	currentSelectedSpeed = option;
}


