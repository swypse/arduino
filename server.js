var express = require('express');
var app = express();


var sp = require("serialport")
var SerialPort = sp.SerialPort
var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
  baudrate: 9600,
  parser: sp.parsers.raw
});


/* разрешить запросы от левых источников */

/* npm install express-cors */

/*
var cors = require('express-cors')
 
app.use(cors({
	allowedOrigins: [
		'*'
	]
}))
*/

/**/

var value = 0;

serialPort.on('data', function(data) {
	value = ('' + data).charCodeAt(0);
	console.log(value);

});


app.get('/', function(req, res){
	res.header('Access-Control-Allow-Origin', '*'); /* Разрешить доступ */
	res.send('' + value);
});

app.listen(3000);