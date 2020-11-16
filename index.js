const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userAuthRooter = require("./auth/user.router");
const usersRouter = require("./users/users.router");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_URL = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.69hqj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.connectDB();
    this.initMiddleware();
    this.initRouters();
    this.listen();
  }

  async connectDB() {
    try {
      this.server = express();
      await mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  }

  initMiddleware() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(morgan("dev"));
    this.server.use("/images", express.static("./public/images"));
  }

  initRouters() {
    this.server.use("/auth", userAuthRooter);
    this.server.use("/users", usersRouter);
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on port", PORT);
    });
  }
}

const server = new Server();
server.start();
