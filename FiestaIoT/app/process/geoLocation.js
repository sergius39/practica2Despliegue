var request = require ('request');

toRadians = function(degrees){
   return degrees * Math.PI / 180;
}

calculoDouble = function(a){
  b = JSON.stringify(a);
  var numero = parseFloat(b.substr(1,b.indexOf('^')));
  return numero;
}

exports.calculaGeoLocation = function(number){
  localizaciones = "";
  latMaxima = -90;
  latMinima = 90;
  longMaxima = -180;
  longMinima = 180;

  var data = fs.readFile('files/file' + number + '.json', 'utf8', function(err, data) {  
      if (err){
        console.error("No existen más archivos para leer", err);
        res.send("No existen más archivos para leer");
        return;
    }
      
      var jsonContent = JSON.parse(data);
      localizaciones = jsonContent['items'];
      deployment = jsonContent['items'][0].deployment;

      if(localizaciones != undefined) {

      	for (var i in localizaciones) {
          if((calculoDouble(localizaciones[i].lat) > latMaxima) && (calculoDouble(localizaciones[i].lat) != 0)) {
            latMaxima = calculoDouble(localizaciones[i].lat);
          }
          if((calculoDouble(localizaciones[i].lat) < latMinima) && (calculoDouble(localizaciones[i].lat) != 0)) {
            latMinima = calculoDouble(localizaciones[i].lat);
          }
          if((calculoDouble(localizaciones[i].long) > longMaxima) && (calculoDouble(localizaciones[i].lat) != 0)) {
            longMaxima = calculoDouble(localizaciones[i].long);
          }
          if((calculoDouble(localizaciones[i].long) < longMinima) && (calculoDouble(localizaciones[i].lat) != 0)) {
            longMinima = calculoDouble(localizaciones[i].long);
          }
        }

        latInfluencia = latMaxima - latMinima;
        longInfluencia = longMaxima - longMinima;

        //Aplicamos la fórmula de Haversine para calcular distancias entre latitudes

        var R = 6371e3; // metros
        var φ1lat = toRadians(latMinima);
        var φ2lat= toRadians(latMaxima);
        var Δφlat = toRadians(latInfluencia);
        var Δλlat = 0;

        var alat = Math.sin(Δφlat/2) * Math.sin(Δφlat/2) + Math.cos(φ1lat) * Math.cos(φ2lat) * Math.sin(Δλlat/2) * Math.sin(Δλlat/2);
        var clat = 2 * Math.atan2(Math.sqrt(alat), Math.sqrt(1-alat));

        var distanciaLatitud = R * clat;

        //Aplicamos la fórmula de Haversine para calcular distancias entre longitudess
 
        var φ1long = toRadians((latMaxima + latMinima)/2);
        var φ2long = φ1long;
        var Δφlong = 0;
        var Δλlong = toRadians(longInfluencia);

        var along = Math.sin(Δφlong/2) * Math.sin(Δφlong/2) + Math.cos(φ1long) * Math.cos(φ2long) * Math.sin(Δλlong/2) * Math.sin(Δλlong/2);
        var clong = 2 * Math.atan2(Math.sqrt(along), Math.sqrt(1-along));

        var distanciaLongitud = R * clong;

        //console.log("la distancia en longitud es " + distanciaLongitud);
        //console.log("la distancia en latitud es " + distanciaLatitud);

        //Calculamos ahora el área de efecto

        var area = ((distanciaLatitud * distanciaLongitud)/1e6).toFixed(4);


        console.log(area);

        var SPARQLText = 'PREFIX Qos-Par: <http://vps165.cesvima.upm.es/qos-parameters#> INSERT DATA { <' + deployment + '> Qos-Par:hasGeoLocationArea "' + area + '^^http://www.w3.org/2001/XMLSchema#double" . }';
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
      }

        else{
        	console.log("la información recibida es incorrecta");
        }
    });
}