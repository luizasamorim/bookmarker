const express = require("express")
const router = express.Router()
const auth = require("../helpers/auth")

const controller = require("../controllers/user")

router.post("/", auth.auth, controller.create)
router.post("/admin/", auth.auth, controller.createAdmin)
router.put("/:id", auth.auth, controller.update)
router.delete("/:id", auth.auth, controller.delete)
router.get("/", auth.auth, controller.getAll) 
router.get("/:id", auth.auth, controller.getById)

module.exports = router