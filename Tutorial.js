var currentPage = 1;
var totalPages = 5;
var tutorial = document.getElementById("tutorial");

//changeable objects in tutorial menu
var tut_header_3 = tutorial.getElementsByTagName('h3')[0];
var tut_header_6 = tutorial.getElementsByTagName('h6')[0];
var tut_algorithms = tutorial.getElementsByTagName('ul')[0];
var tut_p = tutorial.getElementsByTagName('p')[0];
var tut_note = tutorial.getElementsByTagName('p')[1];
var tut_image = tutorial.getElementsByTagName('img')[0];
var tut_nextBtn = tutorial.getElementsByTagName('button')[2];

//default
tut_algorithms.style.display = "none";

function skipTutorial(){
	var blockPage = document.getElementById("blockPage");
	var lineDrawing = anime({
		targets: tutorial,
		opacity: 0,
		easing: 'easeInOutSine',
		duration: 500,
		direction: 'alternate',
		loop: false
    });

    setTimeout(function(){ tutorial.style.visibility = "hidden";  blockPage.style.visibility = "hidden";}, 600);
}

function changePage(z){
	if(currentPage + z < 1){
		return;
	}

	if(currentPage + z > totalPages){
		skipTutorial();
		return;
	}

	currentPage += z;
	document.getElementById("tutorialCounter").innerHTML = currentPage + "/" + totalPages;
	tut_image.style.display = "";
	tut_nextBtn.setAttribute('onclick','changePage(1)')
	tut_nextBtn.innerHTML = "Next";
	tut_algorithms.style.display = "none";
	tut_image.style.width = "350px";

	if(currentPage == 1){
		tut_header_3.innerHTML = "Welcome to Convex Hull Visualizer!";
		tut_header_6.innerHTML = "Made by Eren Can";
		tut_image.src = "images/logo.png";
		tut_note.style.display = "block";
	}else if(currentPage == 2){
		tut_header_3.innerHTML = "Convex Hull";
		tut_header_6.innerHTML = "The Convex Hull of a set of points is defined as the smallest convex polygon, that encloses all of the points in the set.";
		tut_image.src = "images/tutorial/convex-hull.PNG";
		tut_note.style.display = "none";
	}else if(currentPage == 3){
		tut_header_3.innerHTML = "Algorithms";
		tut_header_6.innerHTML = "(best, average, worst)";
		tut_algorithms.style.display = "block";
		tut_image.src = "images/tutorial/";
		tut_image.style.display = "none";
	}else if(currentPage == 4){
		tut_header_3.innerHTML = "Points";
		tut_header_6.innerHTML = "Left-click to create a new point <br>Right-click to delete a point";
		tut_image.src = "images/tutorial/dot.png";
	}else if(currentPage == 5){
		tut_header_3.innerHTML = "Visualize!";
		tut_header_6.innerHTML = "Select an algorithm and click on the \'Visualize!\' button";
		tut_image.src = "images/tutorial/algorithms.PNG";
		tut_image.style.width = "180px";
		tut_nextBtn.innerHTML = "Finish";
		tut_nextBtn.setAttribute('onclick','skipTutorial()');
	}
}
