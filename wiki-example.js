var cheerio = require('cheerio');
var request = require('request');

module.exports = function (req, res, next) {

    var wikiBaseURL = 'http://www.wikipedia.org/wiki/John_Elder_(pastor)';

    request(wikiBaseURL, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
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

            var imgAlt = $('img').attr('alt');
            //console.log("img alt is " + imgAlt);
            var imgSrc;
            if(imgAlt) {
                if (imgAlt.indexOf('prot') > -1) {
                    imgSrc = $('img').eq(1).attr('src');
                    console.log('else ' + imgSrc);
                } else {
                    imgSrc = $('img').attr('src');
                    console.log(imgAlt);
                    console.log('protected' + imgSrc);
                }
            }

            //var imgSrc = $('img').attr('src');


            //return res.status(200).json(countryArray);
            return res.status(200);
        }
    });
};