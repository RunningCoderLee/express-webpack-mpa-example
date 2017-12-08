const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const ls = ['张三', '李四', '王五'];

  async function delayRender(time) {
    await setTimeout(() => {
      res.render('pages/home/templates/index.ejs', { title: 'Home', ls });
    }, time);
  }

  delayRender(1000);
});

module.exports = router;
