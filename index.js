var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var bodyParser = require('body-parser');
var Scraper = require("image-scraper");
var wiki = require('./wiki-example.js');

var scraper = new Scraper("http://www.wikipedia.org/wiki/potato");

var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/sample', function(request, response){

    //scraper.on("image", function(image) {
    //    response.send(image.title);
    //});
    (scraper.scrape( function(image) {
        console.log(image);

    }))();
    response.send(200);
  //response.send(request.body);
});

app.post('/wiki', wiki);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));

/***
* API to process the speech text
***/
app.post('/v1/speech/text', function(request, response){
  response.send('Not Yet Implemented: /v1/speech/text');
});


/***
* Socket handling
***/

io.on('connection', function(client) {  
console.log('Client connected...');

	client.on('join', function(data) {
	    console.log('From Server:' + data);
	});

	client.on('messages', function(data) {
	    console.log('From Server:' + data);
	});
});

server.listen(5000, 'localhost', function(){
  console.log("started");
});






