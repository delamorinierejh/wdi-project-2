module.exports = {
  home:  staticsHome,
};

const path = require("path");

function staticsHome(req,res) {
  console.log("yes");
  return res.sendFile(path.join(__dirname, "../index.html"));
}
