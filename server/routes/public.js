const router = require("express").Router();
const PublicController = require("../Controllers/publicController");


router.get('/products', PublicController.publicProductList) //done
router.get('/products/:id', PublicController.publicProductById) //done
 



module.exports = router;