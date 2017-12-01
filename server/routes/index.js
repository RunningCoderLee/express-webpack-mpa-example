var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var ls = ['张三', '李四', '王五']
  res.render('home/home.ejs', { title: 'Home', ls: ls });
});

module.exports = router;
