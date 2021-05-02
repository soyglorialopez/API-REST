'use strict'
const api = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8000,
};

const jwtConfig = {
    key: process.env.JWT_SECRET_KEY || ''
};


module.exports = {
    api,
    jwtConfig
}