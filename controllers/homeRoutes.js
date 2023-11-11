const router = require("express").Router();

router.get("/", async (req, res) => {
  // Pass serialized data and session flag into template
  res.render("homepage");
});

module.exports = router;
