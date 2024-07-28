const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")
const { Model:Category } = require("./Category")

const Bookmark = sequelize.define("bookmark", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastAccess: {
        type: DataTypes.DATE
    }
})

Bookmark.belongsTo(Category, { onDelete: "CASCADE"})
Category.hasMany(Bookmark)

module.exports = {

    Model: Bookmark,
    
    create: async (obj) => {
        return await Bookmark.create(obj)
    },

    update: async (id, obj) => {
        return await Bookmark.update(obj, {where: {id: id}})
    },

    delete: async (obj) => {
        await obj.destroy()
    },

    getAll: async (limit, offset) => {
        return await Bookmark.findAll({ offset: offset, limit: limit })
    },

    getById: async (id) => {
        return await Bookmark.findByPk(id)
    },

    getByUser: async (userId, limit, offset) => {
        const categories = await Category.findAll({
            where: {
                userId: userId,
            },
            attributes: ['id']
        })

        const ids = categories.map(e => e.id)
        return await Bookmark.findAll({
            where: {
                categoryId: {
                    [Op.in]: ids
                },
            },
            offset: offset,
            limit: limit
        })
    },

    getByCategory: async (categoryId, limit, offset) => {
        return await Bookmark.findAll({
            where: {
              categoryId: categoryId,
            },
            offset: offset,
            limit: limit
        })
    },

    getByTitle: async (title, limit, offset) => {
        return await Bookmark.findAll({
            where: {
              title: {
                [Op.like]: `%${title}%`,
              }
            },
            offset: offset,
            limit: limit
        })
    }
}