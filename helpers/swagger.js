const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
      title: 'bookmarker API',
      description: 'API para gerenciamento de bookmarks.\nBookmarks pertencem a Categorias que pertencem a Usuários.'
    }
  }

output = "../swagger.json"
endpoints = ["./app.js"]

swaggerAutogen(output, endpoints, doc)