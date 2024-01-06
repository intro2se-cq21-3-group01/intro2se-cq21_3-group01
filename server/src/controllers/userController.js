const authMiddleware = require('../middleware/authMiddleware')
const User = require('../models/User');

const userController = {
    getUserById: async (req, res) => {
        try {
            const tokenArray = req.headers.authorization.split(' ');
            const accessToken = tokenArray[1];
            const decodedToken = authMiddleware.verifyToken(accessToken);

            const user = await User.findOne({ _id: decodedToken.id });

            res.status(200).json({
                success: true,
                message: "Get user successfully !",
                data: user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: true,
                message: "Internal Server Error",
                data: {}
            });
        }
    },
    editUser: async (req, res) => {
        try {
            const updatedUser = req.body;

            const tokenArray = req.headers.authorization.split(' ');
            const accessToken = tokenArray[1];
            const decodedToken = authMiddleware.verifyToken(accessToken);

            const user = await User.findOne({ _id: decodedToken.id });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                    data: {}
                });
            }

            user.address = updatedUser.address || user.address;
            user.gender = updatedUser.gender || user.gender;

            await user.save();

            res.status(200).json({
                success: true,
                message: "Get user successfully !",
                data: user
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: true,
                message: "Internal Server Error",
                data: {}
            });
        }
    }
}

module.exports = userController;