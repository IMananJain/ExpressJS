import { Document,Types } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  description: string;
  location: string;
  status: boolean;
  userId: Types.ObjectId;
}
export interface IEventsByQueryParams {
  email: string;
  name?: string;
  status?: boolean;
}
export interface IEventByID {
  email?: string;
  id: string;
}

export interface IResponse {
  message: string;
  data?: unknown;
  success: boolean;
}