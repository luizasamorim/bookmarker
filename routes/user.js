const express = require("express")
const router = express.Router()

const controller = require("../controllers/user")

router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)
router.get("/", controller.getAll)
router.get("/:id", controller.getById)

module.exports = router