module.exports = {
  random:  barsRandom,
  show:   barsShow,
};

const Bar = require("../models/bar");

function barsRandom(req, res){
  let hold = {};
  if (req.params.searchString){
    hold.searchString = req.params.searchString;
  }
  Bar.find(hold, (err, bars) => {

    let bar = bars[Math.floor(Math.random()*bars.length)];
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(200).json({ bar });
  });
}

function barsShow(req, res){
  Bar.findById(req.params.id, (err, bar) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!restaurant) return res.status(404).json({ message: "No restaurant was found." });
    return res.status(200).json({ bar });
  });
}
