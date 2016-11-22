const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  lat: { type: String, trim: true, required: true },
  lng: { type: String, trim: true, required: true },
  place_id: { type: String, trim: true },
  image: { type: String, trim: true, required: true },
  address: { type: String, trim: true, required: true},
  openingHours: { type: Array},
  searchString: { type: String, required: true},
  area: { type: String, required: true},
  rating: { type: Number, required: true},
  website: { type: String, trim: true }

}, {
  timestamps: true
});

module.exports = mongoose.model('Bar', barSchema);
