import Templates from './templates'
import Todo from './todo'

class TodoList {
  constructor() {
    this.todos = localStorage.getItem('todos') || []
  }

  create(e) {
    const $input = $(e.target)
    const val = $input.val().trim()

    if (e.key !== 'Enter') {
      return
    }

    this.todos.push(new Todo(val))

    $input.val('')

    this.render()
  }

  getIndexFromEl(el) {
    const id = $(el).closest('.j-todo-item').data('id')

    return this.todos.findIndex(todo => todo.id === id)
  }

  getActiveTodos() {
    return this.todos.filter(todo => !todo.completed)
  }

  getCompletedTodos() {
    return this.todos.filter(todo => todo.completed)
  }

  getFilteredTodos() {
    if (this.filter === 'active') {
      return this.getActiveTodos()
    }

    if (this.filter === 'completed') {
      return this.getCompletedTodos()
    }

    return this.todos
  }

  toggle(e) {
    const i = this.getIndexFromEl(e.target)
    this.todos[i].toggle()
    this.render()
  }

  destroy(e) {
    const i = this.getIndexFromEl(e.target)
    this.todos.splice(i, 1)
    this.render()
  }

  render() {
    const todos = this.getFilteredTodos()
    $('.j-todo-list').html(Templates.todoList({ todos }))
    $('.j-main').toggle(todos.length > 0)
  }
}

const instance = new TodoList()
Object.freeze(instance)

export default instance
