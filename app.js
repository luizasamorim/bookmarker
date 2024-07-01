const express = require("express")
require("dotenv").config()

const userRouter = require("./routes/user")
const categoryRouter = require("./routes/category")
const bookmarkRouter = require("./routes/bookmark")
const installRouter = require("./routes/install")
const loginRouter = require("./routes/login")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/install", installRouter)
app.use("/user", userRouter)
app.use("/category", categoryRouter)
app.use("/bookmark", bookmarkRouter)
app.use("/login", loginRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`)
})