const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const nodeMailer = require("../utils/nodeMailer");

const bcrypt = require("bcrypt");
const crypto = require('crypto');

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
    // FORGOT PASSWORD
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            // Check email is already exist
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Incorrect Email !",
                    data: {}
                });
            }

            const token = authMiddleware.generateResetPassWordToken(user);

            user.resetPasswordToken = token;
            await user.save();

            // Send email
            const content = {
                email: user.email,
                subject: "Khôi phục mật khẩu",
                // text: "Để khôi phục mật khẩu, vui lòng truy cập đường dẫn sau:"
                html: `<p>Để khôi phục mật khẩu, vui lòng nhấn vào đây:
                            <a 
                            href="http://localhost:8000/api/auth/reset-password/${token}"
                            >
                                Click
                            </a>
                       </p>`
            }

            nodeMailer.sendMail(content);

            return res.status(200).json({
                success: true,
                message: "Please check your email !",
                data: content
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error,
                data: {}
            });
        }
    },
    // RESET PASSWORD
    resetPassword: async (req, res) => {
        try {
            const { token } = req.params;
            const decoded = authMiddleware.verifyResetPassWordToken(token);

            if (!decoded) {
                return res.status(403).json({
                    success: false,
                    message: "Not autheticated !"
                });
            }

            const user = await User.findOne({ _id: decoded.id });

            const resetPassword = crypto.randomBytes(3).toString('hex').toUpperCase();

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(resetPassword, salt);

            user.password = hashed;
            user.resetPasswordToken = undefined;

            await user.save();

            const content = {
                email: user.email,
                subject: "Mật khẩu mới được cung cấp",
                html: `<p>
                            Bạn đã khôi phục mật khẩu thành công, đây là mật khẩu mới: <b>${resetPassword}</b>       
                       </p>`
            }

            nodeMailer.sendMail(content);

            // Thông báo kiểm tra email và đóng tab
            const closeTabScript = `
            <script>
                alert("Mật khẩu đã được đặt lại. Vui lòng kiểm tra email và đóng tab này.");
                window.close();
            </script>
            `;

            res.status(200).send(closeTabScript);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error,
                data: {}
            });
        }
    },
    // CHANGE PASSWORD
    changePassword: async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;

            const tokenArray = req.headers.authorization.split(' ');
            const accessToken = tokenArray[1];
            const decodedToken = authMiddleware.verifyToken(accessToken);

            if (!decodedToken) {
                return res.status(403).json({
                    success: false,
                    message: "Token is invalid !"
                });
            }

            const user = await User.findOne({ _id: decodedToken.id });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found !",
                });
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

            if (!isPasswordValid) {
                return res.status(403).json({
                    success: false,
                    message: "The current password is wrong !",
                });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;

            await user.save();

            return res.status(200).json({
                success: true,
                message: "Change password successfully !"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error,
                data: {}
            });
        }
    }
};

module.exports = authController;