const Bookmark = require("../models/Bookmark")
const Category = require("../models/Category")
const User = require("../models/User")
const validator = require("../validators/bookmark")
const queryValidator = require("../validators/query")

const pagination = async (value) => {
    let limit = value.limit
    let offset = (value.page -1) * limit
    return { limit, offset }
}

module.exports = {
    create: async (req, res) => {
        const { error, value } = validator.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const category = await Category.getById(value.categoryId)
        if (!category || category.userId != req.user.id) {
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

        const oldCategory = await Category.getById(bookmark.categoryId)
        const newCategory = await Category.getById(value.categoryId)
        if (!newCategory || oldCategory.userId != req.user.id || newCategory.userId != req.user.id) {
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

        const category = await Category.getById(bookmark.categoryId)
        if (!category || category.userId != req.user.id) {
            return res.status(400).json({ error: "bookmark not found" })
        }

        await Bookmark.delete(bookmark)

        res.status(200).json(bookmark)
    },

    getAll: async (req, res) => {
        const { error, value } = queryValidator.validate(req.query)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const { limit, offset } = await pagination(value)
        
        res.status(200).json(await Bookmark.getAll(limit, offset))
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

        const { error, value } = queryValidator.validate(req.query)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const { limit, offset } = await pagination(value)

        res.status(200).json(await Bookmark.getByUser(id, limit, offset))
    },

    getByCategory: async (req, res) => {
        const {id} = req.params

        if (!await Category.getById(id)) {
            return res.status(400).json({ error: "category not found" })
        }

        const { error, value } = queryValidator.validate(req.query)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const { limit, offset } = await pagination(value)
        
        res.status(200).json(await Bookmark.getByCategory(id, limit, offset))
    },

    getByTitle: async (req, res) => {
        const { error, value } = queryValidator.validate(req.query)
        if (error) {
            return res.status(400).json({ error: error.details })
        }

        const { limit, offset } = await pagination(value)
        console.log(value.title);
        
        res.status(200).json(await Bookmark.getByTitle(value.title, limit, offset))
    },
    
    deleteOldest: async (req, res) => {
        const bookmarks = await Bookmark.getByUser(req.user.id, null, null)

        let semester = new Date()
        semester.setMonth(semester.getMonth() - 6)
        
        let deleted = []

        bookmarks.forEach(async b => {
            if (b.lastAccess < semester) {
                deleted.push(b)
                await Bookmark.delete(b)
            }
        })

        res.status(200).json({deletedBookmarks: deleted})
    }
}