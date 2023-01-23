import User from "../models/User";

import ManagerPolices from '../middlewares/ManagerPolices.js';
import TechnicianPolices from '../middlewares/TechnicianPolices.js';

export default class UsersController {    

    getUser(req) {
        // TODO: Change this validation to use jwt
        const user = User.findAll({where: {token: req.token}})
        req.user = user;
        return req;
    }

    static getPolice(user) {
        // TODO: apply enum with tag in roles        
        switch(user.role_id) {
            case 1: 
                return ManagerPolices;
            case 2:
            default:
                return TechnicianPolices;
        }
    }
}