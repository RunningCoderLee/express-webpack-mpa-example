import _ from 'lodash'

const Templates = {
  todoList: _.template(`
    <% if (todos.length > 0) { %>
      <% todos.forEach((todo, index) => { %>
        <% console.log('todo ad below==========') %>
        <% console.dir(todo) %>
        <% 
          let todoItemClassName = 'todo-item' 
          if (todo.completed) {
            todoItemClassName = 'todo-item--completed'
          }  
          todoItemClassName = todoItemClassName + ' j-todo-item'
        %>
        <li class="<%= todoItemClassName %>" data-id="<%= todo.id %>">
          <div class="todo-item__view">
            <input
              class="todo-item__toggle j-todo-item-toggle"
              type="checkbox"
              <% if(todo.completed) { %>checked<% } %>
            >
            <label class="todo-item__title"><%- todo.title %></label>
            <button class="todo-item__destroy j-todo-item-destroy"></button>
          </div>
          <input class="todo-item__edit" value="<%- todo.title %>">
        </li>
      <% }); %>
    <% } %>
  `),
  listFooter: _.template(`
    <span class="list-footer__todo-count"><strong><%= activeTodoCount %></strong> <%= activeTodoWord %> left</span>
    <ul class="list-footer__filters">
      <li>
        <a <% if (filter === 'all') { %>class="selected"<% } %> href="#/all">All</a>
      </li>
      <li>
        <a <% if (filter === 'active') { %>class="selected"<% } %> href="#/active">All</a>
      </li>
      <li>
        <a <% if (filter === 'completed') { %>class="selected"<% } %> href="#/completed">All</a>
      </li>
    </ul>
  `),
}

export default Templates
