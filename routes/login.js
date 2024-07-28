const express = require("express")
const router = express.Router()

const controller = require("../controllers/login")

router.post("/", controller.login /* 
    #swagger.tags = ['login'] 
    #swagger.summary = 'logs in and generates a token'
    #swagger.parameters['body'] = {
        in: 'body', 
        required: true,
        schema: {
            email: "email@email.com",
            password: "myP4ssword!"
        }
}
    */
)

module.exports = router