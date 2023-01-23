import Polices from "../contracts/Polices";

export default class TechnicianPolices extends Polices
{
    static canCreateTasks(req)
    {
        return true;
    }

    static canShowTask(req)
    {
        return req.task.user_id === req.user.id;
    }

    static canListTasks(req)
    {
        return true;
    }

    static canUpdateTasks(req)
    {
        return req.task.user_id === req.user.id;
    }

    static canDeleteTasks(req)
    {
        return false;
    }

}