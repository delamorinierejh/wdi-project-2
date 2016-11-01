const rp         = require("request-promise");
const mongoose   = require("mongoose");
const bluebird   = require('bluebird');
mongoose.Promise = bluebird;
const Bar        = require("../models/bar");
const config     = require('../config/config');

mongoose.connect(config.db.production);

Bar.collection.drop();

const areas = [
  { lat : 51.461649, lng : -0.115565, radius : 750, name: "Brixton", string: "brixton"},
  { lat : 51.525338, lng : -0.079750, radius : 750, name: "Shoreditch", string: "shoreditch" },
  { lat : 51.513344, lng : -0.134813, radius : 750, name: "Soho", string: "soho"},
  { lat : 51.539090, lng : -0.142512, radius : 750, name: "Camden Town", string: "camden+town" },
  { lat : 51.510260, lng : -0.147192, radius : 750, name: "Covent Garden", string: "covent+garden" },
  { lat : 51.462255, lng : -0.138841, radius : 750, name: "Clapham High Street", string: "clapham" },
  { lat : 51.513682, lng : -0.195932, radius : 750, name: "Notting Hill Gate", string: "notting+hill" },
  { lat : 51.520961, lng : -0.103448, radius : 750, name: "Farringdon" , string: "farringdon"},
  { lat : 51.544699, lng : -0.055451, radius : 750, name: "Hackney Town", string: "hackney+town" }
];

function searchAreasForBars(areas){
  areas.forEach((area, i) => {
    getBars(area);
  });
}

function getBars(location){
  const options = {
    uri: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location.string}+cocktails+london&key=AIzaSyBXyJT5O1kVAIZLOyuZjjAh3pqaTDnECIY`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  rp (options)
  .then((body, response) => {
    return bluebird.map(body.results, (bar) => {
      if (bar.photos){
        return Bar.create({
          name:         bar.name,
          lat :         bar.geometry.location.lat,
          lng :         bar.geometry.location.lng,
          address:      bar.formatted_address,
          image :       `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${bar.photos[0].photo_reference}&key=AIzaSyBXyJT5O1kVAIZLOyuZjjAh3pqaTDnECIY`,
          place_id:     bar.place_id,
          rating:       bar.rating,
          area:         location.name,
          searchString: location.string
        });
      }
    });
  })
  .then(data => {
    return bluebird.map(data, (bar) => {
      if (!bar) return;

      const options = {
        uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${bar.place_id}&key=AIzaSyBXyJT5O1kVAIZLOyuZjjAh3pqaTDnECIY`,
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true
      };
      return rp(options)
      .then(data => {
        let newDataTwo = {};
        if (data.result){
          newDataTwo.website = data.result.website || '';
        }
        if (data.result.opening_hours){
          newDataTwo.openingHours = data.result.opening_hours.weekday_text || [];
        }
        // }
        // if(data.result){console.log(data.result.website);}
        return Bar.findByIdAndUpdate(bar._id, newDataTwo, {new:true});
      });
    });
  })
  .then(console.log)
  .catch(console.log);
}

// getBars(areas[2]);
searchAreasForBars(areas);
