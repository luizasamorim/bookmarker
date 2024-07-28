const express = require("express")
const router = express.Router()
const auth = require("../helpers/auth")

const controller = require("../controllers/user")

router.post("/", controller.create /* 
    #swagger.tags = ['user'] 
    #swagger.summary = 'creates user' 
    #swagger.description = 'authentication not required so new users can register'
    #swagger.parameters['body'] = {
        in: 'body', 
        required: true,
        schema: {
            name: "name",
            email: "email@email.com",
            password: "myP4ssword!"
        }
    } 
    */
)
router.post("/admin/", auth.auth, controller.createAdmin /* 
    #swagger.tags = ['user'] 
    #swagger.summary = 'creates admin user' 
    #swagger.parameters['obj'] = {
        in: 'body', 
        required: true,
        schema: {
            name: "name",
            email: "email@email.com",
            password: "myPassword",
            admin: true
        }
    } */
)
router.put("/:id", auth.auth, controller.update /* 
    #swagger.tags = ['user'] 
    #swagger.summary = 'updates user' 
    #swagger.parameters['obj'] = {
        in: 'body', 
        required: true,
        schema: {
            name: "name",
            email: "email@email.com",
            password: "myPassword"
        }
    } */
)
router.delete("/:id", auth.auth, controller.delete /* 
    #swagger.tags = ['user'] 
    #swagger.summary = 'deletes user'*/
)
router.get("/", auth.auth, controller.getAll /* 
    #swagger.tags = ['user'] 
    #swagger.summary = 'returns all users'
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
    }*/
) 
router.get("/:id", auth.auth, controller.getById /* 
    #swagger.tags = ['user'] 
    #swagger.summary = 'returns user based on id' 
    #swagger.parameters['id'] = {
        in: 'path', 
        required: true,
            type: 'integer'
    }
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
    }*/
)

module.exports = router