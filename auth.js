'use strict'
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('./config/index');
const { getData } = require('./utils/fetch');

const sign = (data) => {
   return jwt.sign(data, jwtConfig.key)
}

module.exports = {
    authToken: async (data) => {
        try {
            let user = await getData(`users?email=${data.email}`);
            if (user.length == 0 || user[0].email != data.email ) {
                throw new Error('incorrect data');
            };
                    return sign(data);
            } catch (error) {
                console.log(error)
        };
        }
};