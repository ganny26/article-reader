var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var urlparse = require('url-parse');
var fs = require('fs');

var app = express();
app.set('port', (process.env.PORT || 5000));
var payload = [];

app.get('/', function (req, res) {

    pageURL = 'http://www.archanaskitchen.com/how-to-make-homemade-pita-bread';

    request(pageURL, function (error, response, html) {

        if (error) {
            console.log("Error: " + error);
        }

        if (response.statusCode === 200) {
            // Parse the document body
            var $ = cheerio.load(html);
            console.log($);
            var htmlSource = 'Entire HTML Source' + $.html();
            res.write(htmlSource);
        }
    })
});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
