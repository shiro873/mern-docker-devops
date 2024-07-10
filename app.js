const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

let todos = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Walk the dog', completed: true },
  { id: 3, title: 'Do laundry', completed: false }
];

app.get('/', (req, res) => {
  res.render('todo', { todos });
});

app.post('/api/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, title: req.body.title, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = req.body.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index!== -1) {
    todos.splice(index, 1);
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});