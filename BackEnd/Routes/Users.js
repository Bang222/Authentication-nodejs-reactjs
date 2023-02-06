const userController = require("../Controller/userController");
const MiddlewareController = require("../Controller/middelwareController");

const router = require("express").Router();
router.get("/list-data-user",MiddlewareController.verifyToken, userController.getAllUsers)

router.delete("/:id",MiddlewareController.verifyTokenAdminAuthen, userController.deleteUser)
//LOG OUT USER the fist is login after that you can log out

module.exports = router