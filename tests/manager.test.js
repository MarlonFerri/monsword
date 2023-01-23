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

describe('Manager access', () => {
    
    const tasksController = new TasksController();
    it('should list all tasks', async ()=>{
        const manager = await User.findOne({where:{role_id: 1}});
        const req = getReq()
        const res = getRes();
        req.user = manager;
        const response = await tasksController.list(req, res);

        expect(response.status).toEqual(200);
        response.forEach(task => {
            expect(task.user_id).not.toEqual(manager.user_id);
        });
    });

    it('should show one tasks', async ()=>{
        const manager = await User.findOne({where:{role_id: 1}});
        const req = getReq()
        const res = getRes();
        req.user = manager;

        const task = Task.findOne();
        req.task = task;

        const response = await tasksController.show(req, res);

        expect(response.status).toEqual(200);
        expect(response).toHaveLength(1);
        response.forEach(task => {
            expect(task.id).toEqual(task.id);
        });
    });

    it('should delete task', async ()=>{
        const manager = await User.findOne({where:{role_id: 1}});
        const req = getReq()
        const res = getRes();
        req.user = manager;

        // A manager should not able to create a task, but for this test purpose it is just an valid user id;
        const task = Task.create({
            user_id:manager.id,
            summary:'Temporary task'
        });
        const taskId = task.id;
        req.task = task;

        const response = await tasksController.destroy(req, res);
        expect(response.status).toEqual(200);

        const tasks = await Task.findAll({where: {id:taskId}});
        expect(tasks).toHaveLength(0);
    });

    it('should not update one tasks', async ()=>{
        const manager = await User.findOne({where:{role_id: 1}});
        const req = getReq()
        const res = getRes();
        req.user = manager;
        const task = Task.findOne();

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

    it('should not create task', async ()=>{
        const manager = await User.findOne({where:{role_id: 1}});
        const req = getReq()
        const res = getRes();
        req.user = manager;

        const now = new Date().toString();
        const newSummary = `New task for test at ${now}`;
        req.summary = newSummary;

        const response = await tasksController.create(req, res);
        expect(response.status).toEqual(403); // unauthorized

        const tasks = await Task.findAll({where: {summary:newSummary}});
        expect(tasks).toHaveLength(0);
    });

    
});

// await mysqlDatabase.close();