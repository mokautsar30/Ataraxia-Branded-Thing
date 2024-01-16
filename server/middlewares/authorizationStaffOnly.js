const { Product, User, Category } = require("../models/index");

module.exports = async function staffAuthorityOnly(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (req.user.role === "Staff" && req.user.id === product.authorId) {
      next();
    } else if (req.user.role === "Admin") {
      next();
    } else {
      throw { name: "ForbiddenAccess" };
    }
  } catch (error) {
    next(error);
  }
};
