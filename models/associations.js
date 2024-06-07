const sequelize = require('../helpers/db')
const Bookmark = require('./Bookmark')
const Category = require("./Category")
const User = require('./User')

Category.belongsTo(User, {
    foreignKey: 'id',
    as: "userId"
  })
User.hasMany(Category, { as: 'category' })

Bookmark.belongsTo(User, {
  foreignKey: 'id',
  as: "userId"
})
User.hasMany(Bookmark, { as: 'bookmark' })

Bookmark.belongsTo(Category, {
    foreignKey: 'id',
    as: "categoryId"
})
Category.hasMany(Bookmark, { as: 'bookmark' })

module.exports = {
  sequelize,
  User,
  Category,
  Bookmark
}
