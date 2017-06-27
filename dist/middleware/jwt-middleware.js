"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const jwt = require('jsonwebtoken');
const middleware = (req, res, next) => {
    const token = req.body.token || req.headers.authorization;
    if (token) {
        jwt.verify(token, config_1.default.secret, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            error: "Authorisation is needed to access this resource"
        });
    }
};
exports.default = middleware;
