const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const userRoute = require("./routes/user");
const couponRoute = require("./routes/coupon");
const analysisRoute = require("./routes/analysis");

const productAdminRoute = require("./routes/Admin/product")
const employeeAdminRoute = require('./routes/Admin/employee');
const couponsAdminRoute = require('./routes/Admin/coupon');

const conecctToDB = require('./configs/db');
const { countDocuments } = require("./models/Coupon");

const app = express();
dotenv.config();

//CONNECT DATABASE
conecctToDB();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

//ROUTES
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/auth", authRoute);
app.use("/api/orders", orderRoute);
app.use("/api/user", userRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/analysis", analysisRoute);

app.use("/api/admin/product", productAdminRoute);
app.use("/api/admin/employee", employeeAdminRoute);
app.use("/api/admin/coupon", couponsAdminRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running...");
});