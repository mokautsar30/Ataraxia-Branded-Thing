const HomeController = require("../Controllers/homeController");
const UserController = require("../Controllers/userController");
const router = require("express").Router();
const authentication = require("../middlewares/authenticationMid");
const adminOnly = require('../middlewares/authorizationAdminOnly');


router.get("/", HomeController.showHome);

router.post("/login", UserController.login);
router.use("/pub", require("./public"));

router.use(authentication);

router.post("/register", adminOnly, UserController.registerUser);

router.use("/products", require("./products"));
router.use("/categories", require("./categories"));

module.exports = router;
