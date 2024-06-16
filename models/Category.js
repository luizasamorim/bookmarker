const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/bd")

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
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // table name
        key: 'id'
      }
    }
})

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

    getAll: async () => {
        return await Category.findAll()
    },

    getById: async (id) => {
        return await Category.findByPk(id)
    }
}