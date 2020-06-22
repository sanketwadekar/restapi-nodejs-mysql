const express = require('express');
const bodyParser = require('body-parser');
const studentRouter = require('./routes/students');

const app = express();

app.use('/',bodyParser.json());

app.use('/students', studentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started at http://localhost:${PORT}`));