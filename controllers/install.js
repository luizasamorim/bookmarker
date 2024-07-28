const sequelize = require("../helpers/bd")
const User = require("../models/User")
const Category = require("../models/Category")
const Bookmark = require("../models/Bookmark")

module.exports = {
    install: async (req, res) => {
        await sequelize.sync({force: true})
        const users = [
            {
                name: "admin",
                email: "admin@admin.com.br",
                password: "admin",
                admin: true
            },
            {
                name: "second",
                email: "second@common.com.br",
                password: "asdasd",
                admin: false
            },
            {
                name: "third",
                email: "third@common.com.br",
                password: "asdasd",
                admin: false
            },
            {
                name: "fourth",
                email: "forth@common.com.br",
                password: "asdasd",
                admin: false
            },
            {
                name: "fifth",
                email: "fifth@common.com.br",
                password: "asdasd",
                admin: false
            }
        ]
        const categories = [
            {
                name: "useless",
                color: "pink",
                userId: 1
            },
            {
                name: "useful",
                color: "blue",
                userId: 1
            },
            {
                name: "study",
                color: "purple",
                userId: 2
            },
            
            {
                name: "random",
                color: "yellow",
                userId: 2
            },
            {
                name: "home",
                color: "green",
                userId: 2
            }
        ]
        const bookmarks = [
            {
                title: "long doge challenge",
                link: "https://longdogechallenge.com/",
                lastAccess: new Date("01-01-2024"),
                categoryId: 1
            },
            {
                title: "maze toys",
                link: "https://maze.toys/mazes/mini/daily/",
                lastAccess: new Date("01-01-2024"),
                categoryId: 1
            },
            {
                title: "pug in a rug",
                link: "https://puginarug.com/",
                lastAccess: new Date("06-01-2024"),
                categoryId: 2
            },
            {
                title: "google",
                link: "https://www.google.com.br/",
                category: 2,
                lastAccess: new Date("06-01-2024"),
                categoryId: 3
            },
            {
                title: "maps",
                link: "https://www.google.com/maps",
                category: 2,
                lastAccess: new Date("06-01-2024"),
                categoryId: 4
            },
        ]
        try {
            users.forEach(async element => await User.create(element))
            categories.forEach(async element => await Category.create(element))
            bookmarks.forEach(async element => await Bookmark.create(element))
        } catch (error) {
            res.status(500).json({error: error})
        }
        res.status(200).json({msg: "instalação concluída com sucesso!"})
    },
    drop: async (req, res) => {
        try {
            await sequelize.drop()
        } catch (error) {
            res.status(500).json({error: error})
        }
        res.status(200).json({msg: "deleção concluída com sucesso!"})
    }
}