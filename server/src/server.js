const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const userRoute = require("./routes/user");

const conecctToDB = require('./configs/db');

const app = express();
dotenv.config();

//CONNECT DATABASE
conecctToDB();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

//ROUTES
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/orders", orderRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running...");
});