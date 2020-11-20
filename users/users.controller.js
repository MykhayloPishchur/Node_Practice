const userModel = require("./users.model");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

class UserController {
  async getCurrentUser(req, res, next) {
    const { email, subscription } = req.user;
    try {
      return res.status(200).json({ email, subscription });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async updateAvatar(req, res, next) {
    try {
      const user = req.user;
      const avatarURL = `http://localhost:${PORT}/images/${req.file.filename}`;
      await userModel.findByIdAndUpdate(
        user._id,
        {
          avatarURL: avatarURL,
        },
        {
          new: true,
        }
      );

      res.status(200).json(`avatarURL:${avatarURL}`);
      next();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = UserController;
