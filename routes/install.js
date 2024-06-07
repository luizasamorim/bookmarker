const express = require("express")
const router = express.Router()

const controller = require("../controllers/install")

router.get("/", controller.install)
router.get("/drop", controller.drop)

module.exports = router