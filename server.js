/* ------------------------------------- VARIABLES -------------------------------------*/

const PORT = process.env.PORT || 3001;
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

/* ------------------------------------- LIBS -------------------------------------*/
const mongoose = require("mongoose");
const express = require("express"),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv").config(),
  cors = require("cors");

/* ------------------------------------- LOCAL FILES -------------------------------------*/
const routes = require("./routes");

/* ------------------------------------- EXPRESS -------------------------------------*/

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* ------------------------------------- MONGOOSE -------------------------------------*/
mongoose.connect(DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/* ------------------------------------- ROUTES -------------------------------------*/
app.use(cors());
app.use(routes);

/* ------------------------------------- LISTEN -------------------------------------*/

app.listen(PORT, () => console.log(`App Listening on ${PORT}`));
