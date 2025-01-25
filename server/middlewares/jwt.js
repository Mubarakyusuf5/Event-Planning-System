const { sign, verify } = require("jsonwebtoken")
require("dotenv").config()


const createToken = (user)=>{
    const accessToken = sign(
        {id: user.id, email:user.email, fullname: user.fullname, role: user.role}, process.env.JWT_SECRET_KEY
    )

    return accessToken
}

const VerifyToken = (req, res, next)=>{
    const accessToken = req.cookies["token"];

    if (!accessToken) {
        return res.status(400).json({message: "User not Authenticated!"})
    }
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET_KEY)
        if (validToken) {
            req.user = validToken;
            req.authenticated = true
            return next()
        }
    } catch (err) {
        res.status(400).json({message: err.message})
    }

}

module.exports = {
    createToken,
    VerifyToken
}