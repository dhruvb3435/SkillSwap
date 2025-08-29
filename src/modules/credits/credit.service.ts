import mongoose from 'mongoose';
import User from '../users/user.model';

export async function transferCredits(fromUserId: string, toUserId: string, amount: number) {
  if (fromUserId === toUserId) throw Object.assign(new Error('Cannot transfer to self'), { status: 400 });
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const from = await User.findById(fromUserId).session(session);
    const to = await User.findById(toUserId).session(session);
    if (!from || !to) throw Object.assign(new Error('User not found'), { status: 404 });
    if (from.credits < amount) throw Object.assign(new Error('Insufficient credits'), { status: 400 });
    from.credits -= amount;
    to.credits += amount;
    await from.save({ session });
    await to.save({ session });
    await session.commitTransaction();
    return { from, to };
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
}
