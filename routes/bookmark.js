const express = require("express")
const router = express.Router()

const controller = require("../controllers/bookmark")

router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)
router.get("/", controller.getAll)
router.get("/user/:id", controller.getByUser)
router.get("/category/:id", controller.getByCategory)
router.get("/title/:title", controller.getByTitle)
router.get("/:id", controller.getById) //conflitando com as acima

module.exports = router