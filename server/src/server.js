const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const authRoute = require("./routes/auth");

const conecctToDB = require('./configs/db');

const app = express();
dotenv.config();

//CONNECT DATABASE
conecctToDB();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

//ROUTES
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/auth", authRoute);


app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running...");
});