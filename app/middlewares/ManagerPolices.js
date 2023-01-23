import Polices from "../contracts/Polices"

export default class ManagerPolices extends Polices
{
    static canCreateTasks(req)
    {
        return false;
    }

    static canShowTask(req)
    {
        return true;
    }

    static canListTasks(req)
    {
        return true;
    }

    static canUpdateTasks(req)
    {
        return false;
    }

    static canDeleteTasks(req)
    {
        return true;
    }

}