const express = require('express');
const path = require('path');
const data = require('./sampleData/data');

console.log(data.length)

const app = express();

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));


app.get('/api/violations', async (req, res, next) => {

})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));


const { Sequelize, STRING } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:fullstack25@localhost/ecb_violations');
