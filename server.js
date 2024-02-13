const express = require('express')
const cookie_parser = require('cookie-parser')
const app = express()

const auth = require("./routes/auth")
const post = require('./routes/post')

app.use(express.json())
app.use(cookie_parser())
app.use("/auth", auth)
app.use("/post", post)

app.get("/", (req, res) => {
  res.send("Hello")
})

app.listen(3000, () => {
  console.log("server is running.")
})
