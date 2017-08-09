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

GUI.slidebarSettings = {
	init: 100,
	min: 50,
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

GUI.getTileDiv = function(tileType){
	// wrapper = document.createElement("div");
	// wrapper.className = "tile";
	outer1 = document.createElement("div");
	outer1.className = "hexagon tile";
	inner1 = document.createElement("div");
	inner1.className = "hexagon-in1";
	inner2 = document.createElement("div");
	inner2.className = "hexagon-in2 " + GUI.getTileClass(tileType);
	inner1.append(inner2)
	outer1.append(inner1)
	// wrapper.append(outer1)
	// return wrapper
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

	
};

GUI.onSlideBar = function(value){
	var barSettings = GUI.slidebarSettings;
	var dragSettings = GUI.dragSpeedSettings;
	const c = (dragSettings.max-dragSettings.min)
	var element = document.getElementById("Map");
	element.style.zoom = value/100;

	GUI.dragSpeedSettings.value = 1/(dragSettings.min + c*(value-barSettings.min)/(barSettings.max - barSettings.min));
	GUI.initDraggables();
};


// Changin drag speed after scrolling does not work NOT YET WORKING
GUI.initDraggables = function(){
	$(function(){
 		$("#Map").draggable();
 	});
};

GUI.initSlideBar = function(){
	var slidebar = document.getElementById("slidebar");
	slidebar.value = GUI.slidebarSettings.init;
	slidebar.min = GUI.slidebarSettings.min;
	slidebar.max = GUI.slidebarSettings.max;
	GUI.onSlideBar(GUI.slidebarSettings.init);
};
