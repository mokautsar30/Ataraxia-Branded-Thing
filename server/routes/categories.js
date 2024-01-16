const router = require("express").Router();
const CategoryController = require("../Controllers/categoryController")
const authentication = require("../middlewares/authenticationMid");


router.post("/", CategoryController.postAddCategory) //done
router.get("/", CategoryController.showCategory) //done
router.get("/:id", CategoryController.showCategoryById) //done
router.put("/:id", CategoryController.editCategoryById) //done
router.delete("/:id", CategoryController.deleteCategoryById) //done










module.exports = router;