export default class Authorize {
    static authorizeAction(req, res, action)
    {
        const police = req.police;
        if (!police[action](req.user)){
            res.status(403).send('Forbidden.');
        }

        return true;
    }
}