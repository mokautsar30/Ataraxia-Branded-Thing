

module.exports = function adminOnly(req, res, next) {
    try {
      if (req.user.role === "Admin") {
        next();
      } else {
        throw { name: "ForbiddenAccess" };
      }
    } catch (error) {
      next(error)
    }
  }