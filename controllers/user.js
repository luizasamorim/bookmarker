const User = require("../models/User")
const Category = require("../models/Category")
const User = require("../models/User")
const validator = require("../validators/user")

module.exports = {
    create: async (req, res) => {
        const { error, value } = validator.validate(req.body)
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
        const { error, value } = validator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const {id} = req.params

        const user = await User.getById(id)

        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }

        await User.update(id, value)
        res.status(200).json(user)
    },

    delete: async (req, res) => {
        const {id} = req.params
        
        const user = await User.getById(id) 

        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }

        const response = await User.delete(user)

        res.status(200).json(response)
    },

    getAll: async (req, res) => {
        res.status(200).json(await User.getAll())
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
