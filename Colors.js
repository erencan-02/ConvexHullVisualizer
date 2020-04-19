
var bodyStyles = document.body.style;

function changeColor_line(newValue){
	bodyStyles.setProperty('--line-color', "#" + newValue);
}

function changeColor_point(newValue){
	bodyStyles.setProperty('--point-color', "#" + newValue);
}
