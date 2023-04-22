var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect, useRef, useState, } from "react";
import domain from "../config/domain";
import { MainServerContext } from "../context/MainServerContext";
var DEFAULT_TRY_INTERVAL = 3000;
var IDLE = "IDLE";
var CHECKING_MESSAGE = "Checking server availability...";
var BAD_MESSAGE = "Server is not available. Please try again later.";
var GOOD_STATUS = "good";
var checkServerAvailability = function (axiosInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axiosInstance.get(domain + "areyoualive")];
            case 1: return [2 /*return*/, (_a.sent()).data.answer ===
                    "yes"
                    ? GOOD_STATUS
                    : BAD_MESSAGE];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, BAD_MESSAGE];
            case 3: return [2 /*return*/];
        }
    });
}); };
var ProvideMainServer = function (_a) {
    var children = _a.children, tryInterval = _a.tryInterval;
    var _b = useState(IDLE), status = _b[0], setStatus = _b[1];
    var statusRef = useRef(status);
    var axiosInstance = useContext(MainServerContext);
    useEffect(function () {
        statusRef.current = status;
    }, [status]);
    useEffect(function () {
        var setStatusAsyncly = function () { return __awaiter(void 0, void 0, void 0, function () {
            var newStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setStatus(CHECKING_MESSAGE);
                        return [4 /*yield*/, checkServerAvailability(axiosInstance)];
                    case 1:
                        newStatus = _a.sent();
                        setStatus(newStatus);
                        if (newStatus !== GOOD_STATUS) {
                            setTimeout(setStatusAsyncly, tryInterval || DEFAULT_TRY_INTERVAL);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        if (statusRef.current === IDLE) {
            setStatusAsyncly();
        }
    }, [axiosInstance, tryInterval]);
    if (status === GOOD_STATUS) {
        return (_jsx(MainServerContext.Provider, __assign({ value: axiosInstance }, { children: children })));
    }
    else {
        return _jsx("div", { children: status });
    }
};
export { ProvideMainServer };
