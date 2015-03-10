var fs = require('fs');
var path = require('path');
var cellArray= [];

fs.readdir('.', function(err,data){
	for(file in data){
		if(path.extname(data[file])==='.cells'){
			var fileName =  data[file].substring(0, data[file].indexOf("."));
			//console.log(fileName);
			//console.log(data[file]);
			//readAllCells(fileName);
		}
	}

});


	fs.readFile('quasar.cells','utf8',function(err,data){
		if(err) return console.log(err);
		var rowArr = data.split('\n');
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
		var file = fs.createWriteStream('quasar.js');
		file.on('error', function(err) {console.log('error') });
		file.write('var arr = [');
		for(var i=0;i<cellArray.length;i++){
			file.write('['+cellArray[i].join(', '));
			if(i<cellArray.length-1)
				file.write('],\n');
		}

		file.write(']];');
		file.end();


	});
