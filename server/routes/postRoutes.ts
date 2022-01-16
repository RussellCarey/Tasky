const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const mediaController = require("../controllers/mediaController");
const passportRoute = require("passport");
const expressRoute = require("express");
const router = expressRoute.Router();

// Login attempt to twitter.
router.post("/message", authController.checkJWTAndSetUser, postController.uploadTweet);
router.post("/getAllJobs", authController.checkJWTAndSetUser, postController.getAllJobs);
router.post("/deleteJob", authController.checkJWTAndSetUser, postController.deleteJob);
router.post("/addImage", mediaController.uploadAll, mediaController.uploadImage);

module.exports = router;
