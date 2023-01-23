/**
 * @interface
 */
export default class Polices
{
    canCreateTasks(req){};
    canShowTask(req){};
    canListTasks(req){};
    canUpdateTasks(req){};
    canDeleteTasks(req){};

}