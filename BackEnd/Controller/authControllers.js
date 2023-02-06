// hash password you can not see the password you just see a String of Charter
const bcrypt = require("bcrypt");
const Users = require("../Model/User")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();
let refreshRTokens = []
const authController = {
    registerUser: async (req, res) => {
        try {
            //hash Password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            //Create User
            const newUser = await new Users({
                userName: req.body.userName,
                email: req.body.email,
                password: hashed,
            });
            //save to database
            const user = await newUser.save();
            return res.status(200).json(user);

        } catch (err) {
            return res.status(500).json(err)
        }
    },
    generateAccessToken: (Users) => {
        return jwt.sign({
            id: Users.id,
            admin: Users.admin
        }, process.env.JWT_ACCESS_KEY, {
            expiresIn: "20s",
        })
    },
    generateRefreshToken: (Users) => {
        return  jwt.sign({
            id: Users.id,
            admin: Users.admin
        }, process.env.JWT_REFRESH_KEY, {
            expiresIn: "365d"
        })
    },
    loginUser: async (req, res) => {
        try {
            const user = await Users.findOne({userName: req.body.userName})
            if (!user) return res.status(404).json("wrong UserName");
            //compare from input on web vs database hashed
            const validatePassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (validatePassword === false) {
                return res.status(404).json("wrong password")
            }
            if (validatePassword && user) {
                // you need two token have log in
                const accessToken = authController.generateAccessToken(Users)
                const refreshToken = authController.generateRefreshToken(Users)
                refreshRTokens.push(refreshToken)
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure:false,
                    path: "/",
                    sameSite: "strict",
                });
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken, refreshToken });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    rqRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated")
        if(!refreshRTokens.includes(refreshToken)){
            return res.status(403).json("You are not Author of account")
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, Users) => {
            if (err) {
                return console.log("err");
            }
            refreshRTokens = refreshRTokens.filter((token) => token!== refreshToken)
            //create new access token, refresh token and send to use
            const newAccessToken = authController.generateAccessToken(Users);
            const newRefreshToken = authController.generateRefreshToken(Users);
            refreshRTokens.push(newRefreshToken)
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            return res.status(200).json({accessToken: newAccessToken})
        })
    },
    //log out users
    logOutUser : async (req, res) =>{
        res.clearCookie("refreshToken");
        refreshRTokens = refreshRTokens.filter(token =>token !== res.cookie.refreshToken)
        return res.status(200).json("successfully log out")
    }
}
module.exports = authController