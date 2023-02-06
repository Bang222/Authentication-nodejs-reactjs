const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const MiddlewareController = {
    // VerifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            //bearea 123154 split is take 123154 and don't take bearea
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token Is a not valid")
                }
                req.user = user;
                next();
            })
        } else {
            return res.status(401).json("You're not authenticated")
        }
    },
    verifyTokenAdminAuthen: (req, res, next) => {
        MiddlewareController.verifyToken(req, res,() => {
           if(req.user._id === req.params._id || req.user.admin){
               next();
           }
           else{
               return res.status(403).json("You're not authenticated")
           }
        })
    }
}
module.exports = MiddlewareController