//Variable global. Array en el que se almacenan las diferencias de tiempo entre medidas tomadas consecutivamente en el tiempo
var subs = [];

var booleanJitter = false;

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

    subs = [];
    console.log("El count es: "+count);  
  	var media = sum/count;
  	console.log("El delay es: " + media);
    return media;


}


exports.jitterOrNo = function(jitterParam){

  if(jitterParam){
    booleanJitter = true;
    return;
  }

  return;


}


exports.calculaDelay = function(number) {

  
      //Se lee el archivo JSON
      var content = fs.readFileSync('files/file' + number + '.json');
      console.log("El file en delay es: " + number);
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

          //console.log("Iteracion: " + i + ", Valor del campo time: " + jsonContent.items[i].time);

          //Se extrae el campo "time" de cada "item"
          var instant = jsonContent.items[i].time;
          //Conversión a una cadena (String) del campo time extraído. Con substr, nos quedamos con la parte de la cadena que nos interesa
          var timeSTR = JSON.stringify(instant).substr(1,19);
          //Conversión del String a Date. Tiempo transcurrido en milisegundos desde las 00:00:00 horas del día 1 de enero de 1970
          aux1 = Date.parse(timeSTR);

          if(i != 0){
              var resta = ((aux2 - aux1)/1000);
              subs.push(resta);
          }


  }


  if(booleanJitter === true){

    booleanJitter = false;

     return calculaMedia();

  }
  

    return calculaMedia();


    
};