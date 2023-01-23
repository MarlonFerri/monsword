import express from 'express';
import Task from '../app/models/Task';
import TasksController from '../app/controllers/TasksController';
const router = express.Router();

const tasksController = new TasksController();

router.route('/:taskId')
.get(tasksController.list)
.put(tasksController.update)
.delete(tasksController.destroy);

router.post(tasksController.create);


router.param('taskId', (req, res, next, taskId)=> {
    if(!Number.isInteger(taskId)){
        res.status(404).send('Are you lost?');
    }

    const task = Task.findOne({where:{id:taskId}});
    req.task = task;
    next()
});



export default router;