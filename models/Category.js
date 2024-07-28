const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/bd")
const {Model:User} = require("./User")

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Category.belongsTo(User, { onDelete: "CASCADE"})
User.hasMany(Category)

module.exports = {

    Model: Category,
    
    create: async (obj) => {
        return await Category.create(obj)
    },

    update: async (id, obj) => {
        return await Category.update(obj, {where: {id: id}})
    },

    delete: async (obj) => {
        await obj.destroy()
    },

    getAll: async (limit, offset) => {
        return await Category.findAll({ offset: offset, limit: limit })
    },

    getById: async (id) => {
        return await Category.findByPk(id)
    },

    getByUser: async (userId, limit, offset) => {
        return await Category.findAll({
            where: {
              userId: userId,
            },
            offset: offset,
            limit: limit
        })
    }
}