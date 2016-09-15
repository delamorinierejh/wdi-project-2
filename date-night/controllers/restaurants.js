module.exports = {
  random:  restaurantsRandom,
  show:   restaurantsShow,
};
const Restaurant = require("../models/restaurant");

function restaurantsRandom(req, res){
  let hold = {};
  if (req.params.searchString){
    hold.searchString = req.params.searchString;
  }
  Restaurant.find(hold, (err, restaurants) => {

    let restaurant = restaurants[Math.floor(Math.random()*restaurants.length)];
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(200).json({ restaurant });
  });
}

function restaurantsShow(req, res){
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!restaurant) return res.status(404).json({ message: "No restaurant was found." });
    return res.status(200).json({ restaurant });
  });
}
