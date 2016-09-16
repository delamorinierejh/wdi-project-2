const router   = require("express").Router();

const authentications = require("../controllers/authentications");
const bars            = require("../controllers/bars");
const restaurants     = require("../controllers/restaurants");

router.route("/register")
  .post(authentications.register);
router.route("/login")
  .post(authentications.login);

router.route("/bars/:searchString")
  .get(bars.random);
router.route("/bars/:id")
  .get(bars.show);

router.route("/restaurants/:searchString")
  .get(restaurants.random);
router.route("/restaurants/:id")
  .get(restaurants.show);

module.exports = router;
