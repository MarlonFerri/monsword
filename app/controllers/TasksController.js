import TaskPolices from "../enums/TaskPolices";
import Authorize from "../middlewares/Authorize";
import Task from "../models/Task"
import UsersController from "./UsersController";

export default class TasksController
{
    #wrongFieldsMessage = 'The provided task information is not correct.';
    #maxLength = 2500;

    // TODO: move to a error handle class
    #internalErrorMessage = 'Internal error';
    
    async create(req, res)
    {
        Authorize.authorizeAction(req, res, TaskPolices.CAN_CREATE_TASKS);
        
        const fields = {
            summary: req.body.summary,
            user_id: req.user.id
        }

        if(!this.#validateFields(fields))
            res.status(422).send(this.#wrongFieldsMessage);

        try {
            const task = await Task.create(fields);
            res.status(200).send(task);            
        } catch (error) {
            res.status(500).send(this.#internalErrorMessage);
        }
    }

    list(req, res) 
    {
        Authorize.authorizeAction(req, res, TaskPolices.CAN_LIST_TASKS);

        let tasks = [];
        if(UsersController.isManager(req.user)){
            tasks = Task.findAll();
        } else {
            tasks = Task.findAll({ where:{ user_id: req.user.id } });
        }

        res.status(200).send(tasks);
    }

    show(req, res)
    {
        Authorize.authorizeAction(req, res, TaskPolices.CAN_SHOW_TASK);

        res.status(200).send(req.task);
    }

    async update(req, res)
    {
        Authorize.authorizeAction(req, res, TaskPolices.CAN_UPDATE_TASKS);

        const fields = {
            summary: req.body.summary,
            user_id: req.user.id,
            fields: this.getDate(req.body.date)
        }

        if(!this.#validateFields(fields))
            res.status(422).send(this.#wrongFieldsMessage);

        // Do not await
        this.#notifyDateChange(req, date);

        try {
            await Task.update(fields, { where: { id: req.task.id } });
            res.status(200).send(req.task);            
        } catch (error) {
            res.status(500).send(this.#internalErrorMessage);
        }
    }

    destroy(req, res)
    {
        Authorize.authorizeAction(req, res, TaskPolices.CAN_DELETE_TASKS);
        
        try {
            Task.destroy({ where:{ id:req.task.id } })
        } catch (error) {
            res.status(500).send(this.#internalErrorMessage);
        }
    }

    #validateFields(fields) {
        if(!fields.summary){
            return false;
        }
        
        const length = fields.summary.length;
        if(!length || length > this.#maxLength){
            return false;
        }
    }

    async #notifyDateChange(req, date) {
        if (!date) return;

        // TODO: add axios to message broker
        // TODO: add title field to tasks
        console.log(`The tech ${req.user.name} performed the task ${req.task.summary} on date ${req.body.date}.`)
        
    }

    getDate(date) {
        if(!date) {
            return undefined;
        }
        const date = new Date(date);
        return date.getFullYear() + '-' + (date.getMounth()) + '-' + date.getDay();
    }
}