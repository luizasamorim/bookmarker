const express = require("express")
require("dotenv").config()

const bookmarkRouter = require("./routes/bookmark")
const installRouter = require("./routes/install")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/install", installRouter)
app.use("/bookmark", bookmarkRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`)
})