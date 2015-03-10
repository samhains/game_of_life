var fs = require('fs');
var path = require('path');
var arrayOfCellArrays = [];

fs.readdir('.', function(err,data){
	fs.writeFile('/cellsArray.js', '', function(){console.log('done');});
	for(file in data){
		if(path.extname(data[file])==='.cells'){
			var fileName =  data[file].substring(0, data[file].indexOf("."));
			console.log(fileName);

			//console.log(data[file]);
			readAllCells(fileName);
		}
	}

});

function readAllCells(fileName){
	//this is called on each cell
	fs.readFile(fileName+'.cells','utf8',function(err,data){
		if(err) return console.log(err);
		var rowArr = data.split('\n');
		var cellArray = [];
		for(var i=2;i<rowArr.length;i++){
			var cellArrayRow = [];
			for(var j=0;j<rowArr.length;j++){
				if(rowArr[i][j]==='.')
					cellArrayRow.push(0);
				else
					cellArrayRow.push(1);
			}
			cellArray.push(cellArrayRow);
		}
		arrayOfCellArrays.push(cellArray);

		var file = fs.createWriteStream('cellsArray.js');
		file.on('error', function(err) {console.log('error'); });
		file.write('var cellsArray = [');
		for(var i=0;i<arrayOfCellArrays.length;i++){
			file.write('[');
			var cellArr = arrayOfCellArrays[i];
			for(var j=0;j<cellArr.length;j++){
				file.write('['+cellArr[i].join(', '));
				if(j<cellArr.length-1){
					file.write('],\n');}
				else if(j==cellArr.length-1){
					//console.log("hey");
					file.write(']');}
			}
			if(i<arrayOfCellArrays.length-1){
				file.write('],\n');
			}
			

		}

		file.write(']];\n\n');
		file.write('exports.cellsArray = cellsArray;\n');
		file.end();


	});
}