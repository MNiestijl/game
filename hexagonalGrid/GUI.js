GUI = {};

testMap = [
	[1,1,1,1,1,1,1],
	[1,1,2,1,1,1,1],
	[1,2,2,2,1,1,1],
	[1,2,2,2,2,1,1],
	[1,2,2,2,1,1,1],
	[1,2,2,1,1,1,1],
	[1,1,2,2,2,1,1],
	[1,1,2,2,1,1,1],
	[1,2,2,1,1,1,1],
	[1,2,1,1,1,1,1],
	[1,1,1,1,1,1,1],
]

testCenter = {x:5, y:6};

GUI.TileSize = 100

GUI.setTileSize = function(size){
	$(".tile").css("width", 2*size);
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
	wrapper.className = "tile"
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
	width = $("#MapContainer").width();
	height = $("#MapContainer").height();
	posWin = $("#MapContainer").position();
	Mx = posWin.left + width/2;
	My = posWin.top + height/2;
	y = 0;
	counter = 0;
	map.forEach(row=>{
		x = 0;
		rowDiv = document.createElement("div");
		rowDiv.className="Row";
		$("#Map").append(rowDiv);
		row.forEach(tileType=>{
			tileDiv = GUI.getTileDiv(tileType);
			tileDiv.style.left = String(Mx + GUI.TileSize*((x-center.x)-(y-y.center)/2)) + "px";
			tileDiv.style.top = String(My + GUI.TileSize*(y-center.y)*Math.sin(Math.PI/3)) + "px";
			// debugger;
			if (counter%2===0){
				rowDiv.append(tileDiv);
				rowDiv.append(GUI.getTileDiv(0));
			}
			else {
				rowDiv.append(GUI.getTileDiv(0));
				rowDiv.append(tileDiv);
			}
			x+=1;
		});
		counter+=1;
		y+=1;
	});
};

GUI.init = function(){
	GUI.drawMap(testMap, testCenter);
	GUI.setTileSize(GUI.TileSize);

	$( function(){
 		$("#Map").draggable();
	});
};




