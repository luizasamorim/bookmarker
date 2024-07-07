const express = require("express")
const router = express.Router()
const auth = require("../helpers/auth")

const controller = require("../controllers/bookmark")

router.post("/", auth.auth,  controller.create)
router.put("/:id", auth.auth,  controller.update)
router.delete("/deleteOldest", auth.auth,  controller.deleteOldest)
router.delete("/:id", auth.auth,  controller.delete)
router.get("/", auth.auth,  controller.getAll)
router.get("/user/:id", auth.auth,  controller.getByUser)
router.get("/category/:id", auth.auth,  controller.getByCategory)
router.get("/title/:title", auth.auth,  controller.getByTitle)
router.get("/:id", auth.auth,  controller.getById)

module.exports = router