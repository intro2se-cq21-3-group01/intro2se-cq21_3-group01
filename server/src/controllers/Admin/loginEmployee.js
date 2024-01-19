const Employee = require("../../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const LoginEmployee = {

    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_ACCESS_KEY,
        );
    },

    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await Employee.findOne({ email: req.body.email });

            if (!user) {
                return res.json({
                    success: false,
                    message: "Incorrect Email",
                    data: {}
                });
            }


            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.json({
                    success: false,
                    message: "Incorrect password",
                    data: {}
                });
            }

            if (user && validPassword) {
                //Generate access token
                const accessToken = LoginEmployee.generateAccessToken(user);
                const { password, ...others } = user._doc;

                return res.status(200).json({
                    success: true,
                    message: "Log in successfully !",
                    user: user,
                    jwt: accessToken
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                data: {},
            });
        }
    },
};

module.exports = LoginEmployee;