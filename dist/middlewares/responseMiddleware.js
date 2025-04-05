"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseFormatter_1 = require("../utils/responseFormatter");
const responseMiddleware = (req, res, next) => {
    const originalSend = res.send;
    res.send = (body) => {
        const formattedResponse = (0, responseFormatter_1.responseFormatter)(true, body, 'Success');
        return originalSend.call(res, formattedResponse);
    };
    next();
};
exports.default = responseMiddleware;
