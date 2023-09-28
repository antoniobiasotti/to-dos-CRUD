const express = require('express');
const cors = require('cors');

const { v4: uuidv4, v4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {

  const { username } = request.headers; 

  const user = users.find((user) =>
    user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found" })
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {

  const { name, username } = request.body;

  const user = { 
    id: uuidv4(),
    name, 
    username,
    todos: []
  }
  
  // User AlreadyExists
  if(users.some((user) => user.username === username)) {
    return response.status(400).json({ error: 'User already exists!' });
  };

  users.push(user);

  return response.status(201).json(user);

});

app.get('/todos', checksExistsUserAccount, (request, response) => {

  const { user } = request;

  return response.json(user.todos);

});

app.post('/todos', checksExistsUserAccount, (request, response) => {

  const { user } = request;
  const { title, deadline } = request.body;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo);  
  
  return response.status(201).json(todo);

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  
  const { title, deadline } = request.body;
  const { id } = request.params;
  
  // Checks if Todo exists by id
  if()  {
    return response.status(404).json({error: "Todo Not Exist!"});
  }

  // Method: Find the todo object by id
  // Update the title and deadline

  return response.status(201);

});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.listen(3333);

module.exports = app;