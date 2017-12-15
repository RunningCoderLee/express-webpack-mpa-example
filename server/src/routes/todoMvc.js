const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // const todos = [
  //   {
  //     title: 'first-todo',
  //     completed: true,
  //   },
  //   {
  //     title: 'second-todo',
  //     completed: false,
  //   },
  // ];

  res.render('pages/todoMvc/templates/index.ejs');
});

module.exports = router;
