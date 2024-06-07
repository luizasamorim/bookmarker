const {Sequelize} = require("sequelize")
require("dotenv").config()

const dialect = process.env.DIALECT || "sqlite"
const storage = process.env.STORAGE || "./storage/database.sqlite"

const sequelize = new Sequelize({
    dialect: dialect,
    storage: storage
})

module.exports = sequelize