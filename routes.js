var Scraper = require("image-scraper");
var wiki = require('./wiki-scraper.js');

module.exports = function(app, io) {
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

	/***
	* API to process the speech text
	***/
	app.post('/v1/speech/text', function(request, response){
	  io.emit('speech', request.body);
	  response.send('OK.  You Sent: ' + request.body);

	});
};