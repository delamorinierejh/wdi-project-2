module.exports = {
  port: process.env.PORT || 3000,
  db:   process.env.MONGODB_URI || "mongodb://localhost/date-night",
  secret: process.env.SECRET || "Hush hush hush",
  gmKey: process.env.GOOGLE_MAPS_KEY || "mapskey",
  zmKey: process.env.ZOMATO_API_KEY || "zomakey"
};
