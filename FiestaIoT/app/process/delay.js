//Variable global. Array en el que se almacenan las diferencias de tiempo entre medidas tomadas consecutivamente en el tiempo
var subs = [];

var calculaMedia = function(){

	//Variable en la que se va a acumular la suma de las diferencias de las medidas
	var sum = 0;
	//Contador de las entradas posiciones que tiene el array
	var count = 0;
	var aux = 0;

	for(var i in subs){

		if(i != 0){
			aux = sum;
		}
  			sum = subs[i]+aux;

  			count += 1;
  			
  		}

  	var media = sum/count;
  	console.log("El delay es: " + media);


}

exports.calculaDelay = function(req, res) {

	//Se lee el archivo JSON
	var content = fs.readFileSync('files/ejemplo.json');
  	//Se parsea el documento, para tener un objeto JSON de Javascript
  	var jsonContent = JSON.parse(content);

  	//Borrado de la primera entrada del JSON. Así solo se trabaja con la variable que interesa
  	delete jsonContent['vars'];

  	//Definición de variables auxiliares
  	var aux1 = 0;
  	var aux2 = 0;
  	


  	for (var i in jsonContent.items){

  		if(i != 0){
  			var aux2 = aux1;
  		}

  		console.log("Iteracion: " + i + ", Valor del campo time: " + jsonContent.items[i].time);

  		//Se extrae el campo "time" de cada "item"
  		var instant = jsonContent.items[i].time;
  		//Conversión a una cadena (String) del campo time extraído. Con substr, nos quedamos con la parte de la cadena que nos interesa
  		var timeSTR = JSON.stringify(instant).substr(1,19);
  		//Conversión del String a Date. Tiempo transcurrido en milisegundos desde las 00:00:00 horas del día 1 de enero de 1970
  		aux1 = Date.parse(timeSTR);

  		if(i != 0){
  			var resta = ((aux1 - aux2)/1000);
  			//console.log("Esto es aux1: "+aux1);
  			//console.log("Esto es aux2: "+aux2);
  			//console.log("La resta es: "+resta);
  			subs.push(resta);
  		}
  		//Llamada al función que calcula la media
  		calculaMedia();
  		

  	}
  	res.status(200);
  	res.send("OK");

	
};


	









