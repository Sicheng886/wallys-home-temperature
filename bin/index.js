const express = require("express")
const proxy = require("express-http-proxy")

const app = express()
app.use(
  "/api",
  proxy("http://127.0.0.1:3000", {
    proxyReqPathResolver: function (req) {
      const path = req.url
      return "/api" + path
    },
  })
)
app.use(express.static(__dirname + "/../dist"))

app.listen(8080, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log("succeed")
  }
})
