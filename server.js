import MysqlDatabase from './app/database/MysqlDatabase.js';
import express from 'express';

const mysqlDatabase = new MysqlDatabase();
const app = express()
const port = 3000

import userRouter from './routes/users.js';
import taskRouter from './routes/tasks.js';
app.use(Authenticate.authenticateUser)
app.use('users', userRouter)
app.use('tasks', taskRouter)

app.get('/tables', async (req, res) => async (mysqlDatabase) => {
    res.send(await mysqlDatabase.sequelize.query('show databases'));
})
app.listen(port)
mysqlDatabase.close();