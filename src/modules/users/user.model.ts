import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  timezone?: string;
  skillsTeach: string[];
  skillsLearn: string[];
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  name: { type: String, required: true },
  bio: String,
  avatarUrl: String,
  timezone: String,
  skillsTeach: [{ type: String, index: true }],
  skillsLearn: [{ type: String, index: true }],
  credits: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
