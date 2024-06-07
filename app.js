const express = require("express")
require("dotenv").config()

const bookmarkRouter = require("./routes/bookmark")
const installRouter = require("./routes/install")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/install", installRouter)
app.use("/bookmarks", bookmarkRouter)

const port = process.env.PORT || 3000

// const {create} = require("./models/Bookmark")
// app.get("/", async (req, res) => {
//   try {
//     let response = await create(1,"aaa","aaa","aaa","aaa")
//     console.log(response)
//   } catch (error) {
//     console.error("Unable to connect to the database:", error)
//   }
//   res.send("foi")
// })

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`)
})