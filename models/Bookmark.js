const {DataTypes, Op} = require("sequelize")
const sequelize = require("../helpers/bd")

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
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // table name
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories', // table name
        key: 'id'
      }
    }
})

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

    getAll: async () => {
        return await Bookmark.findAll()
    },

    getById: async (id) => {
        return await Bookmark.findByPk(id)
    },

    getByUser: async (userId) => {
        return await Bookmark.findAll({
            where: {
              userId: userId,
            },
        })
    },

    getByCategory: async (categoryId) => {
        return await Bookmark.findAll({
            where: {
              categoryId: categoryId,
            },
        })
    },

    getByTitle: async (title) => {
        return await Bookmark.findAll({
            where: {
              title: {
                [Op.like]: `%${title}%`,
              }
            },
        })
    }
}