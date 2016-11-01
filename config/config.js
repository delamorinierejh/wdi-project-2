module.exports = {
  port: process.env.PORT || 3000,
  db:   {
    test: "mongodb://localhost/date-night-test",
    development: "mongodb://localhost/date-night-development",
    production: process.env.MONGOLAB_URI || "mongodb://localhost/date-night"
  },
  secret: process.env.SECRET || "Hush hush hush",
  gmKey: process.env.GOOGLE_MAPS_KEY || "mapskey",
  zmKey: process.env.ZOMATO_API_KEY || "zomakey"
};
