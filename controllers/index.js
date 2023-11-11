const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./authController");
const feedRoutes = require("./feedController");
const postRoutes = require("./postController");
const profileRoutes = require("./profileController");
const searchRoutes = require("./searchController");
const homeRoutes = require("./homeRoutes");

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);
router.use("/feed", feedRoutes);
router.use("/post", postRoutes);
router.use("/profile", profileRoutes);
router.use("/search", searchRoutes);
router.use("/", homeRoutes);

module.exports = router;
