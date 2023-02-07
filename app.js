require("dotenv").config();
require("express-async-errors")
const express = require("express");
const connectDB = require("./db/connect");
const urlRouter = require("./routes/url");
const mainRouter = require("./routes/main");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const { json } = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/shorten",urlRouter);
app.use("/",mainRouter);
app.use(errorHandlerMiddleware);

const port = 5000;
const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`));
}

start();