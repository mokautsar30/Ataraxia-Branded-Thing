const { Product, Category, User } = require("../models");
const authentication = require("../middlewares/authenticationMid");

const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

class ProductController {
  static async postAddProduct(req, res, next) {
    try {
      const product = req.body;
      product.authorId = req.user.id;
      const data = await Product.create(product);
      console.log(product);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async listProduct(req, res, next) {
    try {
      console.log(req.user, "<<<<<<");
      const data = await Product.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async showProductById(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        throw { name: "ErrorNotFound" };
      }
      res.status(200).json(product);
    } catch (error) {
      console.log("Error in showProductById:", error);
      next(error);
    }
  }

  
  static async editProductById(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is required" }); // add validate body for testing
      }

      const foundEditProduct = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!foundEditProduct) {
        throw { name: "ErrorNotFound" };
      }

      if (req.user.id !== foundEditProduct.authorId && !req.user.isAdmin) {
        throw { name: "ForbiddenAccess" };
      }
      // console.log(req.body);
      // console.log(product);
      const product = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      const updatedProduct = await Product.findByPk(req.params.id); // penambahan code
      res.status(200).json({
        message: `Success update product by id ${req.params.id}`,
        data: updatedProduct,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  static async deleteProductById(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await Product.findOne({
        where: {
          id: productId,
        },
      });
      if (!product) {
        throw { name: "ErrorNotFound" };
      }
      await product.destroy();
      res.status(200).json({
        message: `Success delete product by id ${req.params.id}`,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProductCoverUrl(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        throw { name: "ErrorNotFound" };
      }

      //cloudinary handle
      // console.log(req.file, "<<<<<<<");
      const bufferString = req.file.buffer.toString("base64");
      const uploadData = `data:${req.file.mimetype};base64,${bufferString}`;
      // console.log(uploadData);
      const fileUpload = await cloudinary.uploader.upload(uploadData, {
        public_id: req.file.originalname,
        folder: "uploaded-img-ch1",
        resource_type: "auto",
      });

      //update handle
      await product.update({ imgUrl: fileUpload.secure_url });

      // console.log(fileUpload);
      res
        .status(200)
        .json({ message: `Image ${product.imgUrl} success to update` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
