import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.MONGODB_URI || "mongodb+srv://dhruvb3435_db_user:v8yAxPYgPVn81XzK@cluster0.d9knfhp.mongodb.net/");
}
