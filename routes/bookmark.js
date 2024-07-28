const express = require("express")
const router = express.Router()
const auth = require("../helpers/auth")

const controller = require("../controllers/bookmark")

router.post("/", auth.auth,  controller.create /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'creates bookmark' 
    #swagger.parameters['body'] = {
        in: 'body', 
        required: true,
        schema: {
            title: "title",
            link: "link.com",
            lastAccess: "2000-01-01",
            userId: 1,
            categoryId: 1
        }
    } 
    */
)
router.put("/:id", auth.auth,  controller.update /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'updates bookmark' 
    #swagger.parameters['body'] = {
        in: 'body', 
        required: true,
        schema: {
            title: "title",
            link: "link.com",
            lastAccess: "2000-01-01",
            userId: 1,
            categoryId: 1
        }
    } 
    */
)
router.delete("/deleteOldest", auth.auth,  controller.deleteOldest /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'special operation that deletes bookmarks not accessed in 6 months'
    */
)
router.delete("/:id", auth.auth,  controller.delete /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'deletes bookmark'
    */
)
router.get("/", auth.auth,  controller.getAll /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'returns all bookmarks'
    #swagger.parameters['limit'] = {
        in: 'query',
        type: 'integer'
    }
    #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer'
    }
    */
)
router.get("/user/:id", auth.auth,  controller.getByUser /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'special operation that returns bookmarks based on user'
    #swagger.parameters['limit'] = {
        in: 'query',
        type: 'integer'
    }
    #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer'
    }
    */
)
router.get("/category/:id", auth.auth,  controller.getByCategory /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'special operation that returns all bookmarks based on category'
    #swagger.parameters['limit'] = {
        in: 'query',
        type: 'integer'
    }
    #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer'
    }
    */
)
router.get("/title/", auth.auth,  controller.getByTitle /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'special operation that returns all bookmarks witch contain the informed title'
    #swagger.parameters['title'] = {
        in: 'query',
        required: true
    }
    #swagger.parameters['limit'] = {
        in: 'query',
        type: 'integer'
    }
    #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer'
    }
    */
)
router.get("/:id", auth.auth,  controller.getById /* 
    #swagger.tags = ['bookmark'] 
    #swagger.summary = 'returns all bookmarks based on id'
    #swagger.parameters['limit'] = {
        in: 'query',
        type: 'integer'
    }
    #swagger.parameters['page'] = {
        in: 'query',
        type: 'integer'
    }
    #swagger.responses['200'] = {
        description: 'OK'
    } 
    #swagger.responses['400'] = {
        description: 'Bad Request'
    } 
    */
)

module.exports = router