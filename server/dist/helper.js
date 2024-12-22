"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEmailEJS = exports.formatError = void 0;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const formatError = (error) => {
    var _a;
    let errors = {};
    (_a = error.errors) === null || _a === void 0 ? void 0 : _a.map((issue) => {
        var _a;
        errors[(_a = issue.path) === null || _a === void 0 ? void 0 : _a[0]] = issue.message;
    });
    return errors;
};
exports.formatError = formatError;
const renderEmailEJS = (fileName, data) => __awaiter(void 0, void 0, void 0, function* () {
    const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, `views/emails/${fileName}.ejs`), data);
    return html;
});
exports.renderEmailEJS = renderEmailEJS;
