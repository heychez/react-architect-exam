require('dotenv').config()
const express = require('express');
const app = express();
const Todo = require('./todo.model');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Todo API!'));

app.get('/api/todos', async (req, res) => {
    res.json(await Todo.find());
});

app.get('/api/todos/:id', async (req, res) => {
    let id = req.params.id;

    let todo = await Todo.findById(id);
    if (!todo) return res.status(404).send('Todo not found');

    res.json(todo);
});

app.post('/api/todos', async (req, res) => {
    let payload = req.body;

    res.json(await Todo.create(payload));
});

app.put('/api/todos/:id', async (req, res) => {
    let id = req.params.id;
    let payload = req.body;

    let todo = await Todo.updateById(id, payload);
    if (!todo) return res.status(404).send('Todo not found');

    res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
    let id = req.params.id;

    let todo = await Todo.deleteById(id);
    if (!todo) return res.status(404).send('Todo not found');

    res.json(todo);
});

app.listen(process.env.API_PORT, () => console.log(`Example app listening on PORT ${process.env.API_PORT}!`))