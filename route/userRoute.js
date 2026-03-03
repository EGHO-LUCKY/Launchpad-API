const express = require("express");
const userController = require("../controller/userController");
const registrationValidator = require("../middleware/registrationValidator");
const registerLogin = require("../middleware/registerLogin");
const authLogin = require("../middleware/authLogin");
const logout = require("../middleware/logout");
const userAuth = require("../middleware/userAuth");
const ideaValidator = require("../middleware/ideaValidator");

// INITIALIZE EXPRESS ROUTER
const router = express.Router();

// ROUTES
router.get("/", userController.home);
router.post("/register", registrationValidator, registerLogin, userController.register);
router.post("/login", authLogin, userController.login);
router.get("/logout", logout, userController.logout);
router.get("/:user/ideas", userAuth, userController.getIdeas);
router.put("/:user/ideas", userAuth, ideaValidator, userController.putIdea);
router.get("/:user/ideas/:ideaId", userAuth, userController.getIdea);
router.patch("/:user/ideas/:ideaId", userAuth, userController.patchIdea);
router.delete("/:user/ideas/:ideaId", userAuth, userController.deleteIdea);
router.get("/:user/idea-category", userAuth, userController.ideaCategory);

module.exports = router;