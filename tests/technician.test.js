import { describe, expect, it, test } from "@jest/globals";
import User from "../app/models/User";
import MysqlDatabase from "../app/database/MysqlDatabase";
import TasksController from "../app/controllers/TasksController";
import { getReq, getRes } from "./helper";
import Task from '../app/models/Task.js';
import * as dotenv from 'dotenv'
dotenv.config()

const mysqlDatabase = new MysqlDatabase();
await mysqlDatabase.connect();

describe('Technician access', () => {
    
    const tasksController = new TasksController();
    it('should list tasks from technician', async ()=>{
        const technician = await User.findOne();
        const req = getReq()
        const res = getRes();
        req.user = technician;
        const response = await tasksController.list(req, res);

        expect(response.status).toEqual(200);
        response.forEach(task => {
            expect(task.user_id).toEqual(technician.user_id);
        });
    });

    it('should show one tasks from technician', async ()=>{
        const technician = await User.findOne();
        const req = getReq()
        const res = getRes();
        req.user = technician;

        const task = Task.findOne({where:{user_id: technician.id}});
        req.task = task;

        const response = await tasksController.show(req, res);

        expect(response.status).toEqual(200);
        expect(response).toHaveLength(1);
        response.forEach(task => {
            expect(task.id).toEqual(task.id);
        });
    });

    it('should not show one tasks from other technician', async ()=>{
        const technician = await User.findOne();
        const req = getReq()
        const res = getRes();
        req.user = technician;

        const task = Task.findOne({where:{user_id: {[Op.ne]: technician.id}}});
        req.task = task;

        const response = await tasksController.show(req, res);

        expect(response.status).toEqual(403); // unauthorized
        expect(response).toHaveLength(0);
    });

    it('should not delete task', async ()=>{
        const technician = await User.findOne();
        const req = getReq()
        const res = getRes();
        req.user = technician;

        // A technician should not able to create a task, but for this test purpose it is just an valid user id;
        const task = Task.create({
            user_id:technician.id,
            summary:'Temporary task'
        });
        const taskId = task.id;
        req.task = task;

        const response = await tasksController.destroy(req, res);
        expect(response.status).toEqual(403); // unauthorized

        const tasks = await Task.findAll({where: {id:taskId}});
        expect(tasks).toHaveLength(1);

        // Prevent unnecessary data on db
        await Task.destroy({where:{id:task.id}});
    });

    it('should update one tasks from technician', async ()=>{
        const technician = await User.findOne();
        const req = getReq()
        const res = getRes();
        req.user = technician;
        const task = Task.findOne({where: {user_id: technician.id}});

        const oldSummary = task.summary;
        const newSummary = 'New summary';

        req.summary = newSummary;
        req.task = task;
        const response = await tasksController.update(req, res);

        expect(response.status).toEqual(200); // unauthorized
        expect(response).toHaveLength(1);
        
        const responseTask = response.unshift();
        expect(newSummary).toEqual(task.summary);

        const reloadTask = Task.findOne({where: {id: task.id}});
        expect(newSummary).toEqual(reloadTask.summary);

        // Turn back previous value
        Task.update({summary: oldSummary}, {where:{id:task.id}});

    });

    it('should not update one tasks from other technician', async ()=>{
        const technician = await User.findOne();
        const req = getReq()
        const res = getRes();
        req.user = technician;
        const task = Task.findOne({where: {user_id: {[Op.ne]:technician.id}}});

        const oldSummary = task.summary;
        const newSummary = 'New summary';

        req.summary = newSummary;
        req.task = task;
        const response = await tasksController.update(req, res);

        expect(response.status).toEqual(403); // unauthorized
        expect(response).toHaveLength(1);
        
        const responseTask = response.unshift();
        expect(oldSummary).toEqual(task.summary);

        const reloadTask = Task.findOne({where: {id: task.id}});
        expect(oldSummary).toEqual(reloadTask.summary);
    });

    it('should create task', async () => {
        const technician = await User.findOne();
        const req = getReq()
        const res = getRes();
        req.user = technician;

        const now = new Date().toString();
        const newSummary = `New task for test at ${now}`;
        req.summary = newSummary;

        const response = await tasksController.create(req, res);
        expect(response.status).toEqual(200); // unauthorized

        expect(response).toHaveLength(1);
        const responseTask = response.unshift();
        expect(responseTask.summary).toEqual(newSummary);

        const tasks = await Task.findAll({where: {summary:newSummary}});
        expect(tasks).toHaveLength(1);

        Task.destroy({where:{summary: newSummary}});
    });

    
});

// await mysqlDatabase.close();