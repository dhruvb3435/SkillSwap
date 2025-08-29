// src/modules/auth/auth.service.ts

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import User, { IUser } from "../users/user.model";
import { Secret, SignOptions } from "jsonwebtoken";

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  skillsTeach?: string[];
  skillsLearn?: string[];
}

export interface AuthResponse {
  user: Omit<IUser, "passwordHash">;
  token: string;
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  const existing = await User.findOne({ email: input.email });
  if (existing) {
    const error = new Error("Email already in use") as Error & { status?: number };
    error.status = 409;
    throw error;
  }

  const hash = await bcrypt.hash(input.password, 10);

  const user = await User.create({
    email: input.email,
    passwordHash: hash,
    name: input.name,
    skillsTeach: input.skillsTeach || [],
    skillsLearn: input.skillsLearn || [],
    credits: 100,
  });

  const token = signToken(user);
  return { user: sanitize(user), token };
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    const error = new Error("Invalid credentials") as Error & { status?: number };
    error.status = 401;
    throw error;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const error = new Error("Invalid credentials") as Error & { status?: number };
    error.status = 401;
    throw error;
  }

  const token = signToken(user);
  return { user: sanitize(user), token };
}
function signToken(user: IUser): string {
  
  const secret: Secret = env.JWT_SECRET as Secret;
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as any };


  return jwt.sign(
    { id: String(user._id), email: user.email, name: user.name },
    secret,
    options
  );
}

function sanitize(user: IUser): any {
  const u = user.toObject();
  delete (u as any).passwordHash;
  return u;
}
