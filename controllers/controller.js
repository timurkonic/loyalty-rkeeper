import Service from '../services/service.js';
import logger from '../logger/logger.js';

class Controller {

    async getUserData(req, res) {
        try {
            const id = req.body.cardcode;
            logger.debug({f: 'getUserData', id: id});
            const result = await Service.getUserData(id);
            logger.debug({f: 'getUserData', result: result});
            if (!result)
                return res.status(404).json({error: {error_text: "Card not found", error_code: 1001}});
            return res.json(result);
        }
        catch (e) {
            console.log(e);
            logger.error(e.message);
            return res.status(500).json({error: {error_text: "Internal error", error_code: 1000}});
        }
    }

}

export default new Controller();