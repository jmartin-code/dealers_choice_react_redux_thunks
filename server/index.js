const express = require('express');
const path = require('path');
const app = express();

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json())
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));


//API Routes
app.get('/api/todos', async (req, res, next) => {
    try {
        const tracking = await Todo.findAll();
        res.send(tracking);
    }
    catch (err) {
        next(err)
    }
});

app.post('/api/todos', async (req, res, next) => {
    const { title, content } = req.body.todo;
    const addedTodo = await Todo.create({ title, content });
    res.send(addedTodo)
});

app.put('/api/todos/:id', async (req, res, next) => {
    // console.log('hello')
    const { id } = req.params;
    const updatetodo = await Todo.findByPk(id);

    const { check } = req.body
    await updatetodo.update({ isCheck: check })
    res.send(updatetodo)
});

app.delete('/api/todos/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findByPk(id)
        todo.destroy();
        res.send(todo)
    }
    catch (err) {
        next(err)
    }
});

//Database
const { Sequelize, STRING, TEXT, BOOLEAN } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:fullstack25@localhost/ecb_violations', { logging: false });
const faker = require('faker');

const fakerTodos = [];
while (fakerTodos.length < 10) {
    fakerTodos.push({ title: faker.lorem.word(), content: faker.lorem.sentence() })
}

//Models
const Todo = db.define('todo', {
    title: STRING,
    content: TEXT,
    isCheck: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
});

const syncAndSeed = async () => {
    try {
        await db.authenticate();
        await db.sync({ force: true })
        console.log('Connected to database');

        await Promise.all(fakerTodos.map(todo => Todo.create(todo)))
    }
    catch (err) {
        console.log(err);
    }
}

const runServer = async () => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`server running on port ${port}`));
    }
    catch (error) {
        console.log(error)
    }
}

runServer();