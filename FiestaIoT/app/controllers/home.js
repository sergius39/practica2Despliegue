var number = 1;
var express = require('express');
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');
  fs = require('fs');
  multer = require('multer');
  delay = require('../process/delay');
  payload = require('../process/payload');
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/')
    },
    filename: function (req, file, cb) {
        cb(null, "file" + number + ".json");
        number += 1;
  }
})

var upload = multer({ storage: storage });


module.exports = function (app) {
  app.use('/', router);
};


router.post('/', upload.any(),function (req, res, next){
  var titulo = "post";
  var datos =  req.files;


  var origen = "La información del hostname es " + req.hostname + ".  " + "La información de la IP es " + req.ip + ".  ";
  var seguridad = "La información es segura: " + req.secure + ".  ";
  var cookies = "La petición tiene las siguientes cookies: " + JSON.stringify(req.cookies) + ".  ";
  var tipoInfo = "El tipo de información recibida es: " + req.header('content-type');
  var header = "Date: " + req.get('Date') + " Accept-DateTime: " + req.get(' Accept-Datetime');
  var informacion = origen + seguridad + cookies + tipoInfo;
  

  var newArticle = new Article({
          title : titulo,
          information : informacion,
          text : datos
  });
  newArticle.save(function (err) {
  	if (err){
    	 console.log(err);
  	} 
  });

  res.send('OK');
});




router.get('/comprobacion', function (req, res, next){
  Article.find(function(err, articles){
    console.log(articles);
    if (err){
      return console.log(err);
    } else{
      res.send(articles);
    }
  });
 });

router.get('/comprobacionArchivo/:id', function (req, res, next){
	fs.readFile('files/file' + req.params.id + '.txt', 'utf8', function(err, data) {  
		if (err){
    		console.error("No existen más archivos para leer", err);
    		res.send("No existen más archivos para leer");
    		return;
		}
    	res.send(data);
    });
});


//Rutas de cálculo de datos
router.get('/delay', delay.calculaDelay);
router.get('/payload', payload.calculaPayload);