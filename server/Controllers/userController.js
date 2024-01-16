const { Product, Category, User } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password, phoneNumber, address, username, role } =
        req.body;

      // const hashedPassword = hashPassword(password); // hash

      const user = await User.create({
        email,
        password,
        phoneNumber,
        address,
        username,
        role,
      });
      //   console.log(user);
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailIsRequired" };
      }
      if (!password) {
        throw { name: "PasswordIsRequired" };
      }

      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "UserNotExist" };
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "PasswordInvalid" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token, id: user.id, email: user.email });
    } catch (error) {
      next(error);

    }
  }
}

module.exports = UserController;
