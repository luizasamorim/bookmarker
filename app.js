const express = require('express')

const bookmarkRouter = require('./routes/bookmark')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use('/bookmark', bookmarkRouter)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('teste')
})

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}`)
})