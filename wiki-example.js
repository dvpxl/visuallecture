var cheerio = require('cheerio');
var request = require('request');

module.exports = function (req, res, next) {

    var wikiBaseURL = 'http://www.wikipedia.org/wiki/potatos';
    var key = 'potato';
    //var wikiBaseURL = 'https://www.google.com/#q=potato';
    request(wikiBaseURL, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var imageArray = [];
            //var countryArray = [];
            //$('img').each(function(i, element) {
            //    //var country = $(this);
            //    //var countryName = $(this).text();
            //    //var countryURL = 'https://en.wikipedia.org' + $(this).children().first().attr('href');
            //    //
            //    //countryArray.push({
            //    //    "Country" : countryName,
            //    //    "URL" : countryURL
            //    //});
            //
            //    var imgSrc = $(this).attr('src');
            //    console.log(imgSrc);
            //
            //}); //end each

           // var imgAlt = $('img').attr('alt');
            //console.log("img alt is " + imgAlt);
            var imgSrc;

            $('img').each(function(i, element) {
                imgSrc = $(this).attr('src');
                imageArray.push(imgSrc);
            });

            console.log('images: ' + imageArray.length);

            var filteredImgs = imageArray.filter(function(element_in_array) {
                if (element_in_array.toLowerCase().indexOf(key) > -1){
                    return element_in_array;
                }
            });

            console.log('filtered: ' + filteredImgs.length);

            for(iter = 0; iter < filteredImgs.length; iter++) {
                console.log(filteredImgs[iter]);
            } 


            console.log('here');

            //return res.status(200).json(countryArray);
            return res.status(200);
        }
    });
};