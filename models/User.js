const {DataTypes} = require("sequelize")
const sequelize = require("../helpers/bd")

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = {

    Model: User,
    
    create: async (obj) => {
        return await User.create(obj)
    },

    update: async (id, obj) => {
        return await User.update(obj, {where: {id: id}})
    },

    delete: async (obj) => {
        await obj.destroy()
    },

    getAll: async (limit, offset) => {
        return await User.findAll({ offset: offset, limit: limit })
    },

    getById: async (id) => {
        return await User.findByPk(id)
    }
}