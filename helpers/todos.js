const db = require('../models');

exports.getAllTodos = (req, res) => {
  db.Todo.find()
  .then(todos => {
    res.json(todos);
  })
  .catch(err => {
    res.status(500).json(err);
  });
};

exports.createTodo = (req, res) => {
  db.Todo.create({ name: req.body.name })
  .then(newTodo => {
    res.status(201).json(newTodo);
  })
  .catch(err => {
    res.status(500).json(err);
  });
};

exports.getTodo = (req, res) => {
  db.Todo.findById(req.params.todoId)
  .then(foundTodo => {
    res.json(foundTodo);
  })
  .catch(err => {
    res.status(500).json(err);
  });
};

exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate(
    { _id: req.params.todoId },
    req.body,
    { new: true }
  )
  .then(updatedTodo => {
    res.json(updatedTodo);
  })
  .catch(err => {
    res.status(500).json(err);
  });
};

exports.deleteTodo = (req, res) => {
  db.Todo.remove({ _id: req.params.todoId })
  .then(() => {
    res.status(204).send();
  })
  .catch(err => {
    res.status(500).json(err);
  });
};
