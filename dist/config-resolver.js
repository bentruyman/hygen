"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const config_1 = require("./config");
const configResolver = new config_1.ConfigResolver('.hygen.js', {
    exists: fs_extra_1.default.exists,
    load: (f) => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.resolve(`${f}`).then(s => __importStar(require(s))); }),
    none: (_) => ({}),
});
const resolve = (cwd, defaultTemplates, templatesOverride) => {
    return [
        templatesOverride && path_1.default.resolve(cwd, templatesOverride),
        process.env.HYGEN_TMPLS,
        path_1.default.resolve(cwd, '_templates'),
        path_1.default.resolve(cwd, defaultTemplates),
    ].find((_) => _ && fs_extra_1.default.existsSync(_));
};
exports.default = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const { cwd, templates: defaultTemplates, templatesOverride } = config;
    const resolvedTemplates = resolve(cwd, defaultTemplates, templatesOverride);
    return Object.assign(Object.assign(Object.assign({}, config), { templates: resolvedTemplates }), (yield configResolver.resolve(cwd)));
});
