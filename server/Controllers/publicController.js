const { Product, Category, User, sequelize } = require("../models");
const { Op } = require('sequelize')

class PublicController {
  static async publicProductList(req, res, next) {
    try {
      const {OptionSearch, filter} = req.query;
      const options = { order: [["categoryId", "ASC"]] };

      //pagination
      const page = parseInt(req.query.page) || 1; // page 2
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (filter) {
        if (filter.categoryId === '') {
          throw { name: 'invalidValue' };
        } else if (!Number(filter.categoryId)) {
          throw { name: 'invalidValue' };
        } else {
          let data = filter.categoryId.split(',').map(el => ({
            [Op.eq]: el
          }));
          options.where = {
            categoryId: {
              [Op.or]: data
            }, 
          }
        }
      }

      if(OptionSearch) {
        options.where = {
          name: {
            [Op.iLike]: `%${OptionSearch}%`,
          },
        };
      }

      options.offset = offset;
      options.limit = limit;

      const data = await Product.findAll(options);
      console.log(data);
      const totalProducts = await Product.count()
      const totalPage = Math.ceil(totalProducts / limit);

      res.status(200).json({ message: "Success getting data", data, pagination: {page, limit, totalProducts, totalPage} });
    } catch (error) {
      next(error);
    }
  }
  static async publicProductById(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Data not found' }); // penambahan code
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicController;
