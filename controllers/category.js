const Category = require("../models/Category")
const User = require("../models/User")
const validator = require("../validators/category")

module.exports = {
    create: async (req, res) => {
        const { error, value } = validator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        if (!await User.getById(value.userId)) {
            return res.status(400).json({ error: "user not found" })
        }

        const category = await Category.create(value)
        res.status(200).json(category)
    },

    update: async (req, res) => {
        const { error, value } = validator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const {id} = req.params

        const category = await Category.getById(id)

        if (!category) {
            return res.status(400).json({ error: "category not found" })
        }

        if (!await User.getById(value.userId)) {
            return res.status(400).json({ error: "user not found" })
        }

        await Category.update(id, value)
        value.id = id
        res.status(200).json(value)
    },

    delete: async (req, res) => {
        const {id} = req.params
        
        const category = await Category.getById(id) 

        if (!category) {
            return res.status(400).json({ error: "category not found" })
        }

        await Category.delete(category)

        res.status(200).json(category)
    },

    getAll: async (req, res) => {
        res.status(200).json(await Category.getAll())
    },

    getById: async (req, res) => {
        const {id} = req.params

        const category = await Category.getById(id)
        if (!category) {
            return res.status(400).json({ error: "category not found" })
        }

        res.status(200).json(category)
    },

    getByUser: async (req, res) => {
        const {id} = req.params

        if (!await User.getById(id)) {
            return res.status(400).json({ error: "user not found" })
        }

        res.status(200).json(await Category.getByUser(id))
    }
}
