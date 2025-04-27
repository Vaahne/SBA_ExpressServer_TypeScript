"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const validateTransaction_1 = __importDefault(require("../middleware/validateTransaction"));
const router = express_1.default.Router();
router.route('/').get(transactionController_1.default.allTransactions)
    .post(transactionController_1.default.borrowOrReturn);
router.route('/:id').get(transactionController_1.default.searchTransaction)
    .patch(validateTransaction_1.default, transactionController_1.default.borrowOrReturn);
exports.default = router;
