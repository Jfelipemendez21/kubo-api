"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.status = status;
    }
}
exports.ApiError = ApiError;
