import todoList from './todoList'

import './style.scss'

// const todos = [{
//   title: 111,
//   completed: false,
// }, {
//   title: 222,
//   completed: true,
// }]

$(() => {
  bindEvents()


  function bindEvents() {
    $('.j-new-todo').on('keyup', todoList.create.bind(todoList))
    $('.j-todo-list').on('change', '.j-todo-item-toggle', todoList.toggle.bind(todoList))
      .on('click', '.j-todo-item-destroy', todoList.destroy.bind(todoList))
  }
})
