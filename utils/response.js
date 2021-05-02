'use strict'
module.exports = function (res, err, status, msg, body) {
    if (err) {
        return res.status(status).json({
            msg: msg,
            err: err
        });
    }
    return res.status(status).json({
        msg: msg,
        body: body
    });
};