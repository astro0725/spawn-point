// require express router and the user routes
const router = require("express").Router();
const userRoutes = require("./userRoutes");
// use the userRoutes for all routes starting with /users
router.use("/users", userRoutes);
// export router
module.exports = router;
