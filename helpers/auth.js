const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
    auth: async (req, res, next) => {
        const bearerToken = req.headers["Authorization"] || req.headers["authorization"]
        console.log(bearerToken);

        if (!bearerToken) return res.status(403).json({ error: "missing token"})

        let arrToken = bearerToken.split(" ")
        
        if (arrToken[0] != "Bearer") {
            return res.status(403).json({ error: "missing token"})
        } 
        
        const token = arrToken[1]

        const secret = process.env.SECRET || "123!@#"
        jwt.verify(token, secret, (err, obj) => {
            if (err) {
                return res.status(403).json({ error: err.message})
            } else {
                req.user = obj.user
                next()
            }
        })
    }
}
