require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const connectDB = require("./server/config/db");

const app = express();
const PORT = 5000 || process.env.PORT;

connectDB();

app.use(express.static("public"));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layout/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
