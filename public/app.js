// todo spa javascript

// jquery entry
$(document).ready(function() {
  $.getJSON('/api/todos')
  .then(addAllTodos);

  $('#todoInput').keypress(function(e) {
    if (e.which === 13) {
      createTodo();
    }
  });

  $('.list').on('click', 'span', function(e) {
    deleteTodo($(this).parent().data('id'));
    $(this).parent().remove();

    e.stopPropagation();
  });

  $('.list').on('click', 'li', function() {
    updateTodo($(this));
  });
});

// functions

function addAllTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

function addTodo(todo) {
  let todoLi = $('<li>' + todo.name + '<span>X</span></li>');
  todoLi.data('id', todo._id);
  todoLi.data('completed', todo.completed);
  todoLi.addClass('task');

  if (todo.completed) {
    todoLi.addClass('done');
  }

  $('.list').append(todoLi);
}

function createTodo() {
  const inputTodo = $('#todoInput').val();
  $.post('/api/todos', { name: inputTodo })
  .then(function(newTodo) {
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function deleteTodo(todoId) {
  $.ajax('/api/todos/' + todoId, { method: 'DELETE' })
  .then(function() {
    console.log('Successful delete ' + todoId);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function updateTodo(todoLi) {
  const id = todoLi.data('id');
  const completed = todoLi.data('completed');

  $.ajax('/api/todos/' + id, { method: 'PUT', data: { completed: !completed } })
  .then(function(updatedTodo) {
    todoLi.toggleClass('done');
    todoLi.data('completed', updatedTodo.completed);
  })
  .catch(function(err) {
    console.log(err);
  });
}
