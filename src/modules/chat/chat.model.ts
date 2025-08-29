import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IChatRoom extends Document {
  chatId: string; 
  participants: Types.ObjectId[];
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChatRoomSchema = new Schema<IChatRoom>({
  chatId: { type: String, unique: true, required: true, index: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }],
  lastMessageAt: { type: Date, default: Date.now },
}, { timestamps: true });

export interface IMessage extends Document {
  chatId: string;
  sender: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  chatId: { type: String, required: true, index: true }, 
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export const ChatRoom = mongoose.model<IChatRoom>('ChatRoom', ChatRoomSchema);
export const Message = mongoose.model<IMessage>('Message', MessageSchema);
