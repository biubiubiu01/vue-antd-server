var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.send('当你看到这个的时候，服务已经启动了')
})

module.exports = router
