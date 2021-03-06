var yoloScraper = require('../lib/index.js');


var scraper = yoloScraper.createScraper({

  paramsSchema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "string",
    "minLength": 1
  },

  request: function (username) {
    return 'https://www.npmjs.com/~' + username.toLowerCase();
  },

  extract: function (response, body, $) {
    return $('.collaborated-packages li').toArray().map(function (element) {
      var $element = $(element);
      return {
        name: $element.find('a').text(),
        url: $element.find('a').attr('href'),
        version: $element.find('strong').text()
      };
    });
  },

  schema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type" : "array",
    "items": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": { "type": "string" },
        "url": { "type": "string", "format": "uri" },
        "version": { "type": "string", "pattern": "^v\\d+\\.\\d+\\.\\d+$" }
      },
      "required": [ "name", "url", "version" ]
    }
  }

});

var validParams = "masterT";
var invalidParams = "";

scraper(validParams, function (error, data) {
// scraper(invalidParams, function (error, data) {
  if (error) {
    console.log('error:', error);
  } else {
    console.log('data:', data);
  }
});
