document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const newTodoForm = document.getElementById('new-todo-form');
  
    newTodoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-todo').value.trim();
      if (title) {
        fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title }),
        })
        .then((res) => res.json())
        .then((newTodo) => {
          const todoItem = document.createElement('li');
          todoItem.textContent = newTodo.title;
          todoItem.innerHTML += ` (<span>${newTodo.completed ? 'Completed' : 'Not completed'}</span>)`;
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.dataset.id = newTodo.id;
          todoItem.appendChild(deleteButton);
          todoList.appendChild(todoItem);
          document.getElementById('new-todo').value = '';
        })
        .catch((err) => console.error(err));
      }
    });
  
    todoList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const id = e.target.dataset.id;
        fetch(`/api/todos/${id}`, {
          method: 'DELETE',
        })
        .then((res) => res.json())
        .then((data) => {
          const todoItem = e.target.parentNode;
          todoItem.remove();
        })
        .catch((err) => console.error(err));
      }
    });
  });