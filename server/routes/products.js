const router = require("express").Router();
const ProductController = require("../Controllers/productController");
const authentication = require("../middlewares/authenticationMid");
const adminOnly = require('../middlewares/authorizationAdminOnly')
const staffAuthorityOnly = require('../middlewares/authorizationStaffOnly')

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



router.post("/", ProductController.postAddProduct); //done
router.get("/", ProductController.listProduct); //done
router.get("/:id", ProductController.showProductById); //done
router.put("/:id", staffAuthorityOnly,ProductController.editProductById); //done
router.delete("/:id",staffAuthorityOnly,ProductController.deleteProductById); //done

router.patch("/:id/img-url", staffAuthorityOnly, upload.single('imgUrl'), ProductController.updateProductCoverUrl)

module.exports = router;
