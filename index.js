var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Scraper = require("image-scraper");
var wiki = require('./wiki-example.js');

var scraper = new Scraper("http://www.wikipedia.org/wiki/potato");

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
});


