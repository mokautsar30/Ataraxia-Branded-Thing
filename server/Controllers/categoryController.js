const { Product, Category, User } = require("../models");

class CategoryController {
    static async postAddCategory (req, res, next) {
        try {
            const data = await Category.create(req.body);
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async showCategory (req, res, next) {
        try {
            const category = await Category.findAll()
            res.status(200).json({message: "Success getting data", category})
        } catch (error) {
            next(error)
        }
    }
    static async showCategoryById (req, res,next) {
        try {
            const category = await Category.findByPk(req.params.id);
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }
    static async editCategoryById (req, res, next) {
        try {
            const foundEditCategory = await Category.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if(!foundEditCategory) {
                throw {name: "ErrorNotFound"};
            }
            await Category.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({
                message: `Success update category id ${req.params.id}`,
                data: foundEditCategory,
            });
        } catch (error) {
            next(error)
        }
    }
    static async deleteCategoryById (req, res, next) {
        try {
            const categoryId = req.params.id;
            const category = await Category.findOne({
              where: {
                id: categoryId,
              },
            });
            if(!category) {
                throw { name: "ErrorNotFound"};
            }
            await category.destroy();
            res.status(200).json({
                message: `Success delete category id ${req.params.id}`,
                data:category,
            });
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CategoryController