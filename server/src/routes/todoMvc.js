const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('pages/todoMvc/templates/index.ejs');
});

module.exports = router;
