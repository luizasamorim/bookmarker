const User = require("../models/User")
const userValidator = require("../validators/user")
const adminValidator = require("../validators/admin")
const queryValidator = require("../validators/query")

const pagination = async (value) => {
    let limit = value.limit
    let offset = (value.page -1) * limit
    return { limit, offset }
}

const verifyAdmin = (req) => {
    if (req.user.admin) {
        console.log("admin");
        return true
    }
    return false
}

module.exports = {
    create: async (req, res) => {
        const { error, value } = userValidator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }
        
        const users = await User.getAll()

        const existing = users.find(user => user.email == value.email)
        if (existing) {
            return res.status(400).json({ error: "email already exists"})
        }

        const user = await User.create(value)
        res.status(200).json(user)
    },

    createAdmin: async (req, res) => {
        if (!verifyAdmin(req)) {
            res.status(400).json({ error: "admin permission needed"})
        }

        const { error, value } = adminValidator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }
        
        const users = await User.getAll()

        const existing = users.find(user => user.email == value.email)
        if (existing) {
            return res.status(400).json({ error: "email already exists"})
        }

        const user = await User.create(value)
        res.status(200).json(user)
    },
    
    update: async (req, res) => {
        const admin = verifyAdmin(req)

        const { error, value } = admin ? adminValidator.validate(req.body) : userValidator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const {id} = req.params
        
        if (!await User.getById(id)) {
            return res.status(400).json({ error: "user not found" })
        }

        if (!admin && id != req.user.id) {
            return res.status(400).json({ error: "only admins can update other users" })
        }

        await User.update(id, value)
        value.id = id
        res.status(200).json(value)
    },

    delete: async (req, res) => {
        const admin = verifyAdmin(req)

        const {id} = req.params
        
        const user = await User.getById(id) 

        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }

        if (!admin && id != req.user.id) {
            return res.status(400).json({ error: "only admins can delete other users" })
        } else if (user.admin) {
            return res.status(400).json({ error: "admins can't delete other admins" })
        }

        await User.delete(user)

        res.status(200).json(user)
    },

    getAll: async (req, res) => {
        const { error, value } = queryValidator.validate(req.query)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const { limit, offset } = await pagination(value)
        
        res.status(200).json(await User.getAll(limit, offset))
    },

    getById: async (req, res) => {
        const {id} = req.params

        const user = await User.getById(id)
        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }

        res.status(200).json(user)
    }
}
