const express = require("express")
const router = express.Router()

const controller = require("../controllers/category")

router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)
router.get("/", controller.getAll)
router.get("/user/:id", controller.getByUser)
router.get("/:id", controller.getById)

module.exports = router