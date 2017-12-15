import uuid from 'uuid/v1'

class Todo {
  constructor(title) {
    this.id = uuid()
    this.title = title
    this.completed = false
  }


  toggle() {
    this.completed = !this.completed
  }
}

export default Todo
