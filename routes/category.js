const express = require("express")
const router = express.Router()
const auth = require("../helpers/auth")

const controller = require("../controllers/category")

router.post("/", auth.auth,  controller.create /* 
    #swagger.tags = ['category'] 
    #swagger.summary = 'creates category' 
    #swagger.parameters['body'] = {
        in: 'body', 
        required: true,
        schema: {
            name: "name",
            color: "color",
            userId: 1
        }
    } 
    */
)
router.put("/:id", auth.auth,  controller.update /* 
    #swagger.tags = ['category'] 
    #swagger.summary = 'updates category' 
    #swagger.parameters['body'] = {
        in: 'body', 
        required: true,
        schema: {
            name: "name",
            color: "color",
            userId: 1
        }
    } 
    */
)
router.delete("/:id", auth.auth,  controller.delete /* 
    #swagger.tags = ['category'] 
    #swagger.summary = 'deletes category' */
)
router.get("/", auth.auth,  controller.getAll /* 
    #swagger.tags = ['category'] 
    #swagger.summary = 'returns all categories' 
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
    #swagger.tags = ['category'] 
    #swagger.summary = 'special operation that returns categories based on user' 
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
    #swagger.tags = ['category'] 
    #swagger.summary = 'returns category based on id' 
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

router.get("/bookmark/counter", auth.auth,  controller.getCount)

module.exports = router