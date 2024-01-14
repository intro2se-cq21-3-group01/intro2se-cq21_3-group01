const jwt = require("jsonwebtoken");

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
    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        //Send error if token is not valid
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //create new access token, refresh token and send to user
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    }
}

module.exports = authMiddleware;