const authController = require("../Controller/authControllers");
const MiddlewareController = require("../Controller/middelwareController");
const router = require("express").Router();

router.post("/register",authController.registerUser)
router.post("/login",authController.loginUser)
router.post("/refresh",authController.rqRefreshToken)
// when you logged in after that you could log out
router.post("/logout",MiddlewareController.verifyToken, authController.logOutUser)
module.exports = router