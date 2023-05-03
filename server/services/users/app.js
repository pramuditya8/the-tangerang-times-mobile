if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const { connect } = require("./config/mongoConnection");
const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

connect().then((db) => {
  // console.log(db);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
