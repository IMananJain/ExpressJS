import mongoose, { Schema, Types } from 'mongoose';
import { IEvent } from './interfaces';

const EventSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: Boolean, required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true} 
}, {
    timestamps: true,
    collection: 'Event'
  });

export default mongoose.model<IEvent>('Event', EventSchema);