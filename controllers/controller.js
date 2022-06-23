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
            if (result.error)
                return res.status(400).json({error: {error_text: result.error, error_code: 1002}});
            return res.json(result);
        }
        catch (e) {
            if (e.response && e.response.data && e.response.data.error)
                return res.status(400).json({error: {error_text: e.response.data.error, error_code: 1003}});

            console.log(e);
            logger.error(e.message);
            return res.status(500).json({error: {error_text: "Internal error", error_code: 1000}});
        }
    }

    async postTransaction(req, res) {
        try {
            const account_id = req.body.user_id;
            const amount = req.body.amount;
            logger.debug({f: 'postTransaction', account_id: account_id, amount: amount});
            const result = await Service.postTransaction(account_id, amount);
            logger.debug({f: 'postTransaction', result: result});
            if (!result)
                return res.status(400).json({error: {error_text: "Transaction error", error_code: 1001}});
            if (result.error)
                return res.status(400).json({error: {error_text: result.error, error_code: 1002}});
            return res.json(result);
        }
        catch (e) {
            if (e.response && e.response.data && e.response.data.error)
                return res.status(400).json({error: {error_text: e.response.data.error, error_code: 1003}});

            console.log(e);
            logger.error(e.message);
            return res.status(500).json({error: {error_text: "Internal error", error_code: 1000}});
        }
    }

}

export default new Controller();