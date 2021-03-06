


//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();


var wiki = require('./wiki-scraper.js');
var httpRequest = require('request');



module.exports = function(app, io) {


	var demo_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';
	var demo_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen';
	var demo_html = '<html><head><title>Node.js Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>';


    app.get('/', function(request, response) {
      response.render('pages/index');
    });


	app.post('/wiki', wiki);

	/***
	* API to process the speech text
	***/
	app.post('/v1/speech/text', function(request, response){
	  var output = {};
	  io.emit('speech', request.body);

	  var data = request.body;
	  //alchemy
	  if(data == undefined || data.results == undefined || data.results[0] == null) {
 		console.log("speech no transcript, returning");
 		return;
 	  };
 	
 	  var transcript = data.results[0].alternatives[0].transcript;

	  concepts(request, response, output, transcript);
	  //response.send('OK.  You Sent: ' + transcript);

	});

	app.get('/alchemy', function(request, response){
		var output = {};
		response.header("Access-Control-Allow-Origin", "*");
		response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		

		concepts(request, response, output);

	});

	app.get('/v1/photosearch/:key', function(request, response){

		//flicker
		var domain = 'http://api.flickr.com/services/feeds/photos_public.gne?per_page=5&tags=' + request.params.key + '&tagmode=any&format=json&nojsoncallback=1';
		console.log('photosearch:' + request.params.key);

		httpRequest(domain, function(error, code, data){
			 console.log(data);
			 io.emit('photo', data);
		});

		//flicker
		// var domain = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8f33addfb983de751848d3ee7abbf52e&tags=cats&safe_search=1&per_page=20&format=json';
		// httpRequest(domain, function(error, code, data){

		// 	console.log("server photos:" + data);
		// 	//io.emit('photo', data);
		// });

	});


	function example(req, res) {
		var output = {};

		//Start the analysis chain
		entities(req, res, output);
	}


	function entities(req, res, output) {
		alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
			output['entities'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['entities'] };
			keywords(req, res, output);
		});
	}


	function keywords(req, res, output) {
		alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
			output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
			concepts(req, res, output);
		});
	}


	function concepts(req, res, output, text_data) {
		alchemyapi.concepts('text', text_data, { 'showSourceText':1 }, function(response) {
			output['concepts'] = { text:text_data, response:JSON.stringify(response,null,4), results:response['concepts'] };
			//sentiment(req, res, output);

			io.emit('alchemy', JSON.parse(output.concepts.response));
			console.log(output);
			res.render('pages/index', {alchemy: JSON.parse(output.concepts.response)});
		});
	}


	function sentiment(req, res, output) {
		alchemyapi.sentiment('html', demo_html, {}, function(response) {
			output['sentiment'] = { html:demo_html, response:JSON.stringify(response,null,4), results:response['docSentiment'] };
			text(req, res, output);
		});
	}


	function text(req, res, output) {
		alchemyapi.text('url', demo_url, {}, function(response) {
			output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
			author(req, res, output);
		});
	}


	function author(req, res, output) {
		alchemyapi.author('url', demo_url, {}, function(response) {
			output['author'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
			language(req, res, output);
		});
	}


	function language(req, res, output) {
		alchemyapi.language('text', demo_text, {}, function(response) {
			output['language'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
			title(req, res, output);
		});
	}


	function title(req, res, output) {
		alchemyapi.title('url', demo_url, {}, function(response) {
			output['title'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
			relations(req, res, output);
		});
	}


	function relations(req, res, output) {
		alchemyapi.relations('text', demo_text, {}, function(response) {
			output['relations'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['relations'] };
			category(req, res, output);
		});
	}


	function category(req, res, output) {
		alchemyapi.category('text', demo_text, {}, function(response) {
			output['category'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
			feeds(req, res, output);
		});
	}


	function feeds(req, res, output) {
		alchemyapi.feeds('url', demo_url, {}, function(response) {
			output['feeds'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response['feeds'] };
			microformats(req, res, output);
		});
	}


	function microformats(req, res, output) {
		alchemyapi.microformats('url', demo_url, {}, function(response) {
			output['microformats'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response['microformats'] };
			taxonomy(req, res, output);
		});
	}


	function taxonomy(req, res, output) {
		alchemyapi.taxonomy('url', demo_url, {}, function(response) {
			output['taxonomy'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
			combined(req, res, output);
		});
	}

	function combined(req, res, output) {
		alchemyapi.combined('url', demo_url, {}, function(response) {
			output['combined'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
			image(req, res, output);
		});
	}

	function image(req, res, output) {
		alchemyapi.image('url', demo_url, {}, function(response) {
			output['image'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
			image_keywords(req, res, output);
		});
	}

	function image_keywords(req, res, output) {
		alchemyapi.image_keywords('url', demo_url, {}, function(response) {
			output['image_keywords'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
			console.log(output);
			res.render('pages/index', {alchemy: JSON.stringify(output)});
		});
	}

};