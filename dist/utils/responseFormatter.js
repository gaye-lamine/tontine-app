"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormatter = void 0;
const responseFormatter = (status, message, data) => {
    return {
        status,
        message,
        data
    };
};
exports.responseFormatter = responseFormatter;
