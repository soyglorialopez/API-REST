'use strict'
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/index');
const { getData } = require('../utils/fetch');
const response = require('../utils/response');

const sign =  (data) => {
 return jwt.sign(data, jwtConfig.key)
};

const verifyToken = (token) => {
      return  jwt.verify(token, jwtConfig.key);
}
module.exports = {
    authToken: async (data, res) => {
        console.log(data)
        try {
            let user = await getData(`users?email=${data.email}`);
            if (user.length == 0 || user[0].email != data.email) {
                return response(res, 'Bad Request', 400, 'incorrect data', '');
            } else if (data.password.toString().length < 8) {
                return response(res, 'Bad Request', 400, 'incorrect password', '');
            };
            return sign(data);
        } catch (error) {
            console.log(error)
        };
    },
    auth: () => {
        return function (req, res, next) {
            let token;
            req.headers.authorization ? token = req.headers.authorization.slice(7,) : token = ''
            let decoded
            try {
                decoded = verifyToken(token);
            } catch (error) {
                return response(res, error, 401, 'Not Unauthorized to do this', '')
            }
            let user = getData(`users?email=${decoded.email}`);
            if (user.length === 0) {
                return response(res, '', 401, 'Not Unauthorized to do this', '')
            }
            req.token = token;
             next();
        };
    }
};