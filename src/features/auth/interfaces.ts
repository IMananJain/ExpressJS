import Document from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface AuthRequest extends Request {
  email?: string;
}

export interface IResponse {
  message: string;
  data?: unknown;
  success: boolean;
}