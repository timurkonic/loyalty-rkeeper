import axios from 'axios';
import currency from 'currency.js';
import logger from '../logger/logger.js';

const Axios = axios.create({
    baseURL: process.env.LOYALTY_API,
    timeout: 1000,
    headers: {'X-API-KEY': process.env.APIKEY}
  });

class Service {

    async getUserData(id) {
        const response = await this.sendAPIRequest('get', `account/${id}`);
        const account = response.data;
        return {
            userdata: {
                user_id: id,
                name: id,
                balance: currency(account.balance).multiply(100).value,
                discountcode: 0
            }
        };
    }

    async postTransaction(account_id, amount) {
        const response = await this.sendAPIRequest('post', 'transaction', {
            type: "payruble",
            account: account_id,
            amount: - currency(amount).divide(100).value,
            cassa: 999999,
            chek_sn: 0
        });
        const result = response.data;
        logger.info({f: 'postTransaction', account_id: account_id, amount: amount, result: result});
        return {
            userdata: {
                user_id: account_id,
                name: account_id,
                balance: currency(result.new_balance).multiply(100).value,
                discountcode: 0
            }
        };
    }

    sendAPIRequest(method, url, req) {
        switch (method) {
            case 'get': return Axios.get(url);
            case 'post': return Axios.post(url, req);
            default: throw Error("Unknown method")
        }
    }

}

export default new Service();