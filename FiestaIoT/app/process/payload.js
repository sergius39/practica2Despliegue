var request = require ('request');

exports.calculaPayload = function(number){

	var total = 0;
	var useless = 0;
	var varType;


	var content = fs.readFileSync('files/file' + number + '.json');
	var stringContent = content.toString();
	for(var i in content){

		if(stringContent[i] == ' ' || stringContent[i] == '\n' || stringContent[i] == '{' || stringContent[i] == '}' || stringContent[i] == ',' || stringContent[i] == ':' || stringContent[i] == '"'){
			useless += 1;
		}

		total += 1;

	}

    var jsonContent = JSON.parse(content);

    if(jsonContent['items'][0].deployment != undefined){
       varType = jsonContent['items'][0].deployment;
    }
    else if(jsonContent['items'][0].sensor != undefined){
	   varType = jsonContent['items'][0].sensor;
    }

	var payload = ((100 - ((useless/total)*100))).toFixed(2);

    if(varType != undefined){

	    var SPARQLText = 'PREFIX Qos-Par: <http://vps165.cesvima.upm.es/qos-parameters#> INSERT DATA { <' + varType + '> Qos-Par:hasPayload "' + payload + '^^http://www.w3.org/2001/XMLSchema#double" . }';
	        request({
	           url: "http://vps165.cesvima.upm.es:3030/FiestaIot-Parameters/update",
	           method: "POST",
	           headers: {
	              "content-type": "application/sparql-update",  // <--Very important!!!
	           },
	           body: SPARQLText
	        }, function (error, response, body){
	         console.log(SPARQLText);
	        });

		console.log("El payload es: "+payload+"%");
   }

}
