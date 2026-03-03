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
router.post("/register", registrationValidator, registerLogin, userController.register); // Registers User
router.post("/login", authLogin, userController.login); // Logs in User
router.get("/logout", logout, userController.logout); // Logs out User
router.get("/:user/my-ideas", userAuth, userController.myIdeas); // Gets Ideas of logged in User only
router.get("/:user/ideas", userAuth, userController.getIdeas); // Allows logged in User to Get all Ideas
router.put("/:user/ideas/new", userAuth, ideaValidator, userController.putIdea); // Allows logged in User to Creates new Idea
router.get("/:user/ideas/:ideaId", userAuth, userController.getIdea); // Allow logged in User to Get an Idea by its Id
router.patch("/:user/ideas/:ideaId", userAuth, userController.patchIdea); // Allows logged in User to Updates Idea
router.delete("/:user/ideas/:ideaId", userAuth, userController.deleteIdea); // Allows logged in User to Delete personal Idea 
router.get("/:user/idea-category", userAuth, userController.ideaCategory); // Allows logged in User to get Ideas by idea category

module.exports = router;