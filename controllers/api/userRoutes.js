// require the necessary modules
const router = require("express").Router();
const { User } = require("../../models/user");
// post request to create a new user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    // if the email is not found, return an error message
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // if the email is found, compare the password entered with the hashed password stored in the database
    const validPassword = await userData.checkPassword(req.body.password);
    // if the password is incorrect, return an error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // if the password is correct, save the session, and return a response with the user and a success message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// post request to log out a user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// export the router
module.exports = router;
