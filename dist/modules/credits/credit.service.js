"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferCredits = transferCredits;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../users/user.model"));
async function transferCredits(fromUserId, toUserId, amount) {
    if (fromUserId === toUserId)
        throw Object.assign(new Error('Cannot transfer to self'), { status: 400 });
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const from = await user_model_1.default.findById(fromUserId).session(session);
        const to = await user_model_1.default.findById(toUserId).session(session);
        if (!from || !to)
            throw Object.assign(new Error('User not found'), { status: 404 });
        if (from.credits < amount)
            throw Object.assign(new Error('Insufficient credits'), { status: 400 });
        from.credits -= amount;
        to.credits += amount;
        await from.save({ session });
        await to.save({ session });
        await session.commitTransaction();
        return { from, to };
    }
    catch (e) {
        await session.abortTransaction();
        throw e;
    }
    finally {
        session.endSession();
    }
}
