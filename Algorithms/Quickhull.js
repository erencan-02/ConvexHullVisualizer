/*
NOTE:
Main code is from https://github.com/claytongulick/quickhull/blob/master/quickhull.js
I integrated it into this project 

Features: Visuals (lines, colors, etc.)
*/


function getMinMaxPoints(pointSet) {
    var i;
    var minPoint;
    var maxPoint;

    minPoint = pointSet[0];
    maxPoint = pointSet[0];

    for(i=1; i<pointSet.length; i++) {
        if(pointSet[i].x < minPoint.x)
            minPoint = pointSet[i];
        if(pointSet[i].x > maxPoint.x)
            maxPoint = pointSet[i];
    }

    return [minPoint, maxPoint];
}

function distanceFromLine(point, line) {
    var vY = line[1].y - line[0].y;
    var vX = line[0].x - line[1].x;
    return (vX * (point.y - line[0].y) + vY * (point.x - line[0].x))
}

function distalPoints(line, points) {
    var i;
    var outer_points = [];
    var point;
    var distal_point;
    var distance=0;
    var max_distance=0;

    for(i=0; i<points.length; i++) {
        point = points[i];
        distance = distanceFromLine(point,line);

        if(distance > 0) outer_points.push(point);
        else continue; //short circuit

        if(distance > max_distance) {
            distal_point = point;
            max_distance = distance;
        }

    }

    return {points: outer_points, max: distal_point};
}

function addSegments(line, points) {
    var distal = distalPoints(line, points);
    if(!distal.max) return hull.push(line[0]);
    addSegments([line[0], distal.max], distal.points);
    addSegments([distal.max, line[1]], distal.points);
}




function ConvexHull_Quickhull(){
    points = []
    var nodes = $('.point');
    for(var i = 0; i<nodes.length; i++){
        points.push(html_point.get(nodes[i]));
    }

	hull = [];
	var middleLine = getMinMaxPoints(points);

    addSegments(middleLine, points);
    addSegments([middleLine[1], middleLine[0]], points); //reverse line direction to get points on other side
    //add the last point to make a closed loop
    hull.push(hull[0]);
    hull.pop();


    hull.forEach(el => point_html.get(el).className = "point-hull");
    ConnectHull();
    changeHullCount(hull.length);
    isRunning = false;
    EnableButtons();
}



