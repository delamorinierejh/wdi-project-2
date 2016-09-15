const rp         = require("request-promise");
const mongoose   = require("mongoose");
const bluebird   = require('bluebird');
mongoose.Promise = bluebird;
const Restaurant = require("../models/restaurant");
const config     = require('../config/config');

mongoose.connect(config.db);

Restaurant.collection.drop();

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


function searchAreasForRestaurants(areas){
  const startOne   = 0;
  const startTwo   = 20;
  const startThree = 40;
  areas.forEach((area, i) => {
    getRestaurants(area, startOne);
    getRestaurants(area, startTwo);
    getRestaurants(area, startThree);
  });
}

function getRestaurants(location, start){
  const options = {
    uri: `https://developers.zomato.com/api/v2.1/search?lat=${location.lat}&lon=${location.lng}&radius=${location.radius}&sort=cost&order=desc&start=${start}`,
    headers: {
      'user-key': 'c26463b35d04bd52538faa32670ceb30'
    },
    json: true
  };
  return rp(options)
  .then((body, response) => {
    return bluebird.map(body.restaurants, (restaurant) => {
      return Restaurant.create({
        name:         restaurant.restaurant.name,
        lat :         restaurant.restaurant.location.latitude,
        lng :         restaurant.restaurant.location.longitude,
        address:      restaurant.restaurant.location.address,
        image :       restaurant.restaurant.featured_image,
        costForTwo:   restaurant.restaurant.average_cost_for_two,
        costBand:     restaurant.restaurant.price_range,
        cuisine:      restaurant.restaurant.cuisines,
        rating:       restaurant.restaurant.user_rating.aggregate_rating,
        area:         location.name,
        searchString: location.string
      });
    });
  })
  .then(data => {
    return bluebird.map(data, (restaurant) => {
      const options = {
        uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=${restaurant.lat},${restaurant.lng}&keyword=${encodeURIComponent(restaurant.name)}&key=AIzaSyAS6QpQfPX0rI8J1RLynWXxUkJ7QFnvHBI`,
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
      };
      return rp(options)
      .then(data => {
        let newData = {};
        if (data.results[0]) {
          newData.place_id = data.results[0].place_id;
        }
        return Restaurant.findByIdAndUpdate(restaurant._id, newData, {new: true});
      });
    });
  })
  .then(data => {
    return bluebird.map(data, (restaurant) => {
      const options = {
        uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${restaurant.place_id}&key=AIzaSyAS6QpQfPX0rI8J1RLynWXxUkJ7QFnvHBI`,
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
        return Restaurant.findByIdAndUpdate(restaurant._id, newDataTwo, {new:true});
      });
    });
  })
  .then(console.log)
  .catch(console.log);
}

// getRestaurants(areas[0], 0);
// searchAreasForRestaurants(areas);
