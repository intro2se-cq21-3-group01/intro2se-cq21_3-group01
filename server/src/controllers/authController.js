const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const bcrypt = require("bcrypt");

const authController = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const user = await User.findOne({
                $or: [
                    { username: req.body.username },
                    { email: req.body.email }
                ]
            });

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Username or email already exists !',
                    data: {}
                });
            }

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //Save user to DB
            await newUser.save();

            return res.status(200).json({
                success: true,
                message: 'Register successfully !',
                data: {}
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    },
    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Incorrect username or password !",
                    data: {}
                });
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.status(404).json({
                    success: false,
                    message: "Incorrect username or password !",
                    data: {}
                });
            }

            if (user && validPassword) {
                //Generate access token
                const accessToken = await authMiddleware.generateAccessToken(user);

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });

                const { password, ...others } = user._doc;

                return res.status(200).json({
                    success: true,
                    message: "Log in successfully !",
                    data: { ...others, accessToken }
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                data: {}
            });
        }
    },
    //LOG OUT
    logOut: async (req, res) => {
        //Clear cookies when user logs out
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
    },
};

module.exports = authController;