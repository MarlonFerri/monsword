import UsersController from "../controllers/UsersController";

export default class Authenticate {
    static authenticateUser (req, res, next) {
        req = UsersController.getUser(req);

        if(!req.user) {
            res.status(401).send('Not Authorized.');
            return;
        }

        req.police = UsersController.getPolice();

        next();
    }

    
}