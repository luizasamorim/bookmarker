const Bookmark = require("../models/Bookmark")
const Category = require("../models/Category")
const User = require("../models/User")
const validator = require("../validators/bookmark")

module.exports = {
    create: async (req, res) => {
        const { error, value } = validator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        if (!await User.getById(value.userId)) {
            return res.status(400).json({ error: "user not found" })
        }

        if (!await Category.getById(value.categoryId)) {
            return res.status(400).json({ error: "category not found" })
        }

        const bookmark = await Bookmark.create(value)
        res.status(200).json(bookmark)
    },

    update: async (req, res) => {
        const { error, value } = validator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const {id} = req.params

        const bookmark = await Bookmark.getById(id)

        if (!bookmark) {
            return res.status(400).json({ error: "bookmark not found" })
        }

        if (!await User.getById(value.userId)) {
            return res.status(400).json({ error: "user not found" })
        }

        if (!await Category.getById(value.categoryId)) {
            return res.status(400).json({ error: "category not found" })
        }

        await Bookmark.update(id, value)
        value.id = id
        res.status(200).json(value)
    },

    delete: async (req, res) => {
        const {id} = req.params
        
        const bookmark = await Bookmark.getById(id) 

        if (!bookmark) {
            return res.status(400).json({ error: "bookmark not found" })
        }

        await Bookmark.delete(bookmark)

        res.status(200).json(bookmark)
    },

    getAll: async (req, res) => {
        res.status(200).json(await Bookmark.getAll())
    },

    getById: async (req, res) => {
        const {id} = req.params

        const bookmark = await Bookmark.getById(id)
        if (!bookmark) {
            return res.status(400).json({ error: "bookmark not found" })
        }

        res.status(200).json(bookmark)
    },

    getByUser: async (req, res) => {
        const {id} = req.params

        if (!await User.getById(id)) {
            return res.status(400).json({ error: "user not found" })
        }

        res.status(200).json(await Bookmark.getByUser(id))
    },

    getByCategory: async (req, res) => {
        const {id} = req.params

        if (!await Category.getById(id)) {
            return res.status(400).json({ error: "category not found" })
        }

        res.status(200).json(await Bookmark.getByCategory(id))
    },

    getByTitle: async (req, res) => {
        const {title} = req.params
        res.status(200).json(await Bookmark.getByTitle(title))
    }
}
