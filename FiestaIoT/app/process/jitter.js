exports.calculaJitter = function(number, delayCallback){


    /*Article.findOne({}, {}, { sort: { '_id' : -1 }}, function(err, post){
        var file = post.text[0].filename;
        console.log("El file es: " + file);
        if(file){*/

            //Se lee el archivo JSON
            var content = fs.readFileSync('files/file' + number + '.json');
            //Se parsea el documento, para tener un objeto JSON de Javascript
            var jsonContent = JSON.parse(content);

            //Borrado de la primera entrada del JSON. Así solo se trabaja con la variable que interesa
            delete jsonContent['vars'];
            

            //Se extrae el campo "time" del primer "item". El primer "item" es el más reciente, es decir el tiempo en el que se ha hecho la última obsrevación
            var instant1 = jsonContent.items[0].time;
            //Se extrae el campo "time" del segundo "item". El segundo "item" es el siguiente más reciente, es decir el tiempo en el que se ha hecho la penúltima obsrevación
            var instant2 = jsonContent.items[1].time;
            //Conversión a una cadena (String) del campo time extraído. Con substr, nos quedamos con la parte de la cadena que nos interesa
            var timeSTR1 = JSON.stringify(instant1).substr(1,19);
            var timeSTR2 = JSON.stringify(instant2).substr(1,19);    
            //Conversión del String a Date. Tiempo transcurrido en milisegundos desde las 00:00:00 horas del día 1 de enero de 1970
            var lastInstant1 = Date.parse(timeSTR1);
            var lastInstant2 = Date.parse(timeSTR2);



            //Cambiamos el valor a true de la variable del módulo del delay que necesitamos para que dentro de la función calculaDelay, nos devuelva el delay y lo usemos para calcular el jitter
            delay.jitterOrNo(true);
            //Obtenemos el valor del delay
            var delaycalculado = delayCallback;

            if(delaycalculado) {

                console.log("El delay es (en el calculo del jitter): " + delaycalculado);
                var jittercalculado = Math.abs((((lastInstant1 - lastInstant2)/1000)-delaycalculado));
                console.log("El jitter es: " + jittercalculado);

            }
             
};