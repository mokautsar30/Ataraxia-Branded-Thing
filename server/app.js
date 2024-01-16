if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
};
const cors = require("cors")
const express = require("express");
const app = express();
// const port = process.env.PORT || 3000;
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const middlewareLog = (req, res, next) => {
  console.log("incoming request");
  console.log(`${req.method} ${req.path}`);
  next();
};
app.use(middlewareLog);

app.use(routes);

app.use(errorHandler)




module.exports = app