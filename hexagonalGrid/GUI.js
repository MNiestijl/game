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
]

const testCenter = {x:5, y:6};

GUI.TileSize = 1000;

GUI.setTileSize = function(size){
	$(".tile").css("width", 1/2*Math.sqrt(3)*size);
	$(".tile").css("height", size);
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
	wrapper = document.createElement("div");
	wrapper.className = "tile";
	outer1 = document.createElement("div");
	outer1.className = "hexagon";
	inner1 = document.createElement("div");
	inner1.className = "hexagon-in1";
	inner2 = document.createElement("div");
	inner2.className = "hexagon-in2 " + GUI.getTileClass(tileType);
	inner1.append(inner2)
	outer1.append(inner1)
	wrapper.append(outer1)
	return wrapper
};

GUI.drawMap = function(map, center){
	const width = $("#MapContainer").width();
	const height = $("#MapContainer").height();
	const posWin = $("#MapContainer").position();
	const Mx = posWin.left + width/2;
	const My = posWin.top + height/2;
	var y = 0;
	var counter = 0;
	map.forEach(row=>{
		x = 0;
		rowDiv = document.createElement("div");
		rowDiv.className="Row";
		$("#Map").append(rowDiv);
		row.forEach(tileType=>{
			tileDiv = GUI.getTileDiv(tileType);
			// debugger;
			if (counter%2===0){
				rowDiv.append(tileDiv);
				rowDiv.append(GUI.getTileDiv(0));
				tileDiv.style.left = String(Math.floor(Mx + 0.6*GUI.TileSize*(x-center.x))) + "px";
			}
			else {
				rowDiv.append(GUI.getTileDiv(0));
				rowDiv.append(tileDiv);
				tileDiv.style.left = String(Math.floor(Mx + 0.6*GUI.TileSize*(x-center.x + 1/2))) + "px";
			}
			tileDiv.style.top = String(Math.floor(My + 0.6*GUI.TileSize*(y-center.y)*Math.sin(Math.PI/3))) + "px";
			x+=1;
		});
		counter+=1;
		y+=1;
	});
};

GUI.init = function(){
	GUI.drawMap(testMap, testCenter);
	GUI.setTileSize(GUI.TileSize);
	// GUI.initSlideBar(25);

	$( function(){
 		$("#Map").draggable();
	});
};

GUI.onSlideBar = function(value){
	var element = document.getElementById("Map")
	element.style.zoom = 4*value/100;
};

GUI.initSlideBar = function(initValue){
	var slidebar = document.getElementById("slidebar");
	slidebar.value=initValue;
	GUI.onSlideBar(initValue);
};
