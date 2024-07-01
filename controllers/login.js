const User = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body

        const users = await User.getAll()
        const user = users.find(user => user.email == email)

        if (!user) {
            return res.status(400).json({ error: "user not found"})
        }

        if (user.password != password) {
            return res.status(400).json({ error: "invalid combination of email and password"})
        }
        
        const secret = process.env.SECRET || "123!@#"
        const token = jwt.sign({user: user}, secret, {expiresIn: "60 min"})

        res.status(200).json({logged: true, token: token})
    }
}
