var express = require('express');
var app = express();
var server = require('http').Server(app);  
var bodyParser = require('body-parser');
var Scraper = require("image-scraper");
var wiki = require('./wiki-example.js');
var io = require('socket.io')(server);
var Flickr = require('flickrapi')
    var flickrOptions = {
        api_key : '761d67ddbc44075fc5cdc5bf0d3fab55',
        secret : '0daab7c61a61a88a'
    };




var scraper = new Scraper("http://www.wikipedia.org/wiki/potato");

//test keywords
var keywords = ['Tesla', 'Microsoft', 'Apple', 'macbook', 'Elon Musk'];

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

    Flickr.authenticate(flickrOptions, function(error, flickr) {
        flickr.photos.search({
            text: 'penguin',
            safe_search : 1
        }, function(error, result) {
            if(!error && result.statusCode == 200){

            }
        })
    });
    response.send(200);
  //response.send(request.body);
});

app.post('/wiki', wiki);


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


