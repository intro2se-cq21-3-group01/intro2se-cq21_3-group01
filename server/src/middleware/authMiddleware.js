const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const authMiddleware = {
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "365d" }
        );
    },
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },
    generateResetPassWordToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_RESET_PASSWORD_KEY,
            { expiresIn: "1d" }
        );
    },
    verifyToken: (token) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

            return decoded;
        } catch (error) {
            console.error("Decoding error:", error.message);
            return null;
        }
    },
    verifyResetPassWordToken: (token) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY);

            return decoded;
        } catch (error) {
            return null;
        }
    },
    checkPermissionStaff: async (req, res, next) => {
        try {
            const authorizationHeader = req.headers.authorization;

            console.log("acc2",authorizationHeader);
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                return res.status(403).json({
                    success: false,
                    message: "Access token missing or invalid!"
                });
            }

            const accessToken = authorizationHeader.split(' ')[1];
            const decodedToken = authMiddleware.verifyToken(accessToken);

            if (!decodedToken || !decodedToken.id) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid token or user information missing!"
                });
            }

            const userId = decodedToken.id;
            const employee = await Employee.findOne({ _id: userId });

            console.log(employee);
            console.log(employee.isAdmin);
            if (!employee || employee.isAdmin === true) {
                return res.status(403).json({
                    success: false,
                    message: "Only staffs are allowed to perform this action!"
                });
            }

            // Attach user information to the request for future middleware/routes to use if needed
            req.currentUser = employee;

            // If the user is an STAFF, continue with the next middleware/route
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },
    checkPermissionAdmin: async (req, res, next) => {
        try {
            const authorizationHeader = req.headers.authorization;
            console.log("acc1",authorizationHeader);
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                return res.status(403).json({
                    success: false,
                    message: "Access token missing or invalid!"
                });
            }

            const accessToken = authorizationHeader.split(' ')[1];
            const decodedToken = authMiddleware.verifyToken(accessToken);

            if (!decodedToken || !decodedToken.id) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid token or user information missing!"
                });
            }

            const userId = decodedToken.id;
            const employee = await Employee.findOne({ _id: userId });

            console.log(employee);
            console.log(employee.isAdmin);

            if (!employee || employee.isAdmin === false) {
                return res.status(403).json({
                    success: false,
                    message: "Only admins are allowed to perform this action!"
                });
            }

            // Attach user information to the request for future middleware/routes to use if needed
            req.currentUser = employee;

            // If the user is an ADMIN, continue with the next middleware/route
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        }

    },
}

module.exports = authMiddleware;
