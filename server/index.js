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

// app.get('/api/buildings/:id', async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const building = await Building.findAll({
//             where: {
//                 identifier: id
//             },
//             include: Violation
//         })
//         res.send(building)
//     }
//     catch (err) {
//         next(err)
//     }
// })

//Database
const { Sequelize, STRING, TEXT } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:fullstack25@localhost/ecb_violations', { logging: false });

//Models
const Todo = db.define('todo', {
    title: STRING,
    content: TEXT
});

const syncAndSeed = async () => {
    try {
        await db.authenticate();
        await db.sync({ force: true })
        console.log('Connected to database');

        await Todo.create({ title: 'testing', content: 'testing1' });
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