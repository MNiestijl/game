var GUI = {};

const testMap = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],	
	[1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1],
	[1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1],
	[1,1,1,1,2,2,2,2,2,2,1,2,2,2,2,2,1,1],
	[1,1,1,2,2,2,2,2,2,2,1,1,2,2,2,2,1,1],
	[1,2,2,2,2,2,2,2,2,2,1,1,2,2,2,1,1,1],
	[1,2,2,2,2,2,2,2,2,2,1,1,1,2,1,1,1,1],
	[1,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1],
	[1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];;

const testCenter = {x:10, y:10};

GUI.TileSize = 100;

GUI.mapScaleSettings = {
	value: 100,
	min: 40,
	max: 150,
};

GUI.dragSpeedSettings = {
	value: 1,
	min: 1/2,
	max: 2,
};

GUI.setTileSize = function(size){
	$(".tile").css("width", size);
	$(".tile").css("height", 2*size);
};

GUI.getTileClass = function(tileType){
	switch(tileType){
		case 0:
			return "invisibleTile"
		case 1:
			return "blueTile"
		case 2:
			return "greenTile"
	};
};

//  Misschien hier een constructor van maken? Meer object-oriented.
GUI.getTileDiv = function(tileType){
	outer1 = document.createElement("div");
	outer1.className = "hexagon tile";
	inner1 = document.createElement("div");
	inner1.className = "hexagon-in1";
	inner2 = document.createElement("div");
	inner2.className = "hexagon-in2 " + GUI.getTileClass(tileType);
	inner1.append(inner2)
	outer1.append(inner1)
	return outer1
};

GUI.drawMap = function(map, center){
	const posWin = $("#MapContainer").position();
	const Mx = posWin.left + $("#MapContainer").width()/2;
	const My = posWin.top + $("#MapContainer").height()/2;
	var y = 0;
	var counter = 0;
	map.forEach(row=>{
		x = 0;
		rowDiv = document.createElement("div");
		rowDiv.className="Row";
		$("#Map").append(rowDiv);
		row.forEach(tileType=>{
			tileDiv = GUI.getTileDiv(tileType);
			if (counter%2===0){
				rowDiv.append(tileDiv);
				rowDiv.append(GUI.getTileDiv(0));
				tileDiv.style.left = String(Mx + 0.97*GUI.TileSize*(x-center.x)) + "px";
			}
			else {
				rowDiv.append(GUI.getTileDiv(0));
				rowDiv.append(tileDiv);
				tileDiv.style.left = String(Mx + 0.97*GUI.TileSize*(x-center.x + 1/2)) + "px";
			}
			tileDiv.style.top = String(My + 0.97*GUI.TileSize*(y-center.y)*Math.sin(Math.PI/3)) + "px";
			x+=1;
		});
		counter+=1;
		y+=1;
	});
};

GUI.init = function(){
	GUI.drawMap(testMap, testCenter);
	GUI.setTileSize(GUI.TileSize);
	GUI.initSlideBar();
	GUI.initDraggables()
	document.getElementById("MapContainer").addEventListener("wheel", GUI.onScroll)
};

GUI.onSlideBar = value => GUI.scaleMap(value/100);

GUI.scaleMap = function(value){
	document.getElementById("Map").style.transform = "scale(" + String(value) + ")";
	GUI.mapScaleSettings.value = value*100;
};

GUI.initDraggables = function(){
	$(function(){
 		$("#Map").draggable();
 	});
};

GUI.initSlideBar = function(){
	slidebar.min = GUI.mapScaleSettings.min;
	slidebar.max = GUI.mapScaleSettings.max;
	GUI.setSlideBar(GUI.mapScaleSettings.value);
};

GUI.setSlideBar = function(value){
	document.getElementById("slidebar").value=value;
};

GUI.onScroll = function(e){
	e.preventDefault();
	const scrollSpeed = 10;
	const newScaleUnchecked = (GUI.mapScaleSettings.value + scrollSpeed*e.wheelDeltaY/120)/100;
	const newScale = Math.min(Math.max(newScaleUnchecked, GUI.mapScaleSettings.min/100), GUI.mapScaleSettings.max/100);
	GUI.scaleMap(newScale);
	GUI.setSlideBar(newScale*100);
};
