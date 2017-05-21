exports.calculaPayload = function(req, res){

	var total = 0;
	var useless = 0;


	var content = fs.readFileSync('files/file2.json').toString();
	for(var i in content){

		if(content[i] == ' ' || content[i] == '\n' || content[i] == '{' || content[i] == '}' || content[i] == ',' || content[i] == ':' || content[i] == '"'){
			useless += 1;
		}

		total += 1;

	}

	var payload = (100 - ((useless/total)*100));
	console.log("El payload es: "+payload+"%");

	res.send("Payload calculado");

}
