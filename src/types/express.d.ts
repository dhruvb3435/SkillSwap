// Extend Express types to include authenticated user
import 'express';

declare global {
  namespace Express {
    interface AuthUser {
      id: string;
      email: string;
      name: string;
    }
    interface Request {
      user?: AuthUser;
    }
  }
}

// Ensure it's a module
export {};
