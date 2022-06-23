class Service {

    async getUserData(id) {
        return {
            userdata: {
                user_id: id,
                name: id,
                balance: 100,
                discountcode: 0
            }
        };
    }

}

export default new Service();