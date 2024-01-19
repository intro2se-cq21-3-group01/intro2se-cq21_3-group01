const jwt = require("jsonwebtoken");

const middlewareController = {
    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) =>{
                if(err){
                    return res.status(403).json({
                        success: false,
                        message:  "Token is not valid",
                        
                    });
                }
                req.user = user;
                next();
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "You're not authenticated"
            });
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, ()=>{
            if(req.user.isAdmin){
                next();
            }
            else{
                return res.status(403).json({
                    success: false,
                    message: "You're not allowed to do this"
                })
            }
        });

    }
}

module.exports = middlewareController;