const express = require("express")
const router = express.Router()

const controller = require("../controllers/install")

router.get("/", controller.install /* 
    #swagger.tags = ['db'] 
    #swagger.summary = 'installs database'
    */
)
router.delete("/drop", controller.drop /* 
    #swagger.tags = ['db'] 
    #swagger.summary = 'drops database'
    */
)

module.exports = router