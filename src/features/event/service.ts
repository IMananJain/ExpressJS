import { IUser } from "../auth/interfaces";
import { IEvent, IEventByID, IResponse, IEventsByQueryParams } from "./interfaces";

import userModel from "../auth/model";
import eventModel from "./model";

const response: IResponse = {
  message: "",
  success: false,
};

type IEventUserInput = IEvent & IUser;

class EventService {

  static async getAllEvents(data: Partial<IEventsByQueryParams>): Promise<IResponse> {
    const userExists = await userModel.findOne({ email: data.email });
    if (!userExists) {
      response.message = "User does not exists";
      response.success = false;
      return response;
    }
    let query = {};
    if (data.name || data.status) {
      query = {
        ...(data.name && { name: data.name }),
        ...(data.status && { status: data.status }),
      };
    }
    const eventExists = await eventModel.find(query, {_id: 0,__v: 0,userId: 0});
    if (eventExists.length === 0) {
      response.message = "Events does not exists";
      response.success = false;
      return response;
    }
    response.message = "Event list found successfully";
    response.success = true;
    response.data = eventExists;
    return response;
  }

  static async getEventByID(data: Partial<IEventByID>): Promise<IResponse> {
    const userExists = await userModel.findOne({ email: data.email });
    if (!userExists) {
      response.message = "User does not exists";
      response.success = false;
      return response;
    }
    const eventExists = await eventModel.findOne(
      { _id: data.id },
      { _id: 0, __v: 0, userId: 0 }
    );
    if (!eventExists) {
      response.message = "Event does not exists";
      response.success = false;
      return response;
    }
    response.message = "Event found successfully";
    response.success = true;
    response.data = eventExists;
    return response;
  }

  static async createEvent(data: IEventUserInput): Promise<IResponse> {
    const userExists = await userModel.findOne({ email: data.email });
    if (!userExists) {
      response.message = "User does not exists";
      response.success = false;
      return response;
    }

    const userObjectId = userExists?._id;
    const { email, ...eventDetails } = data;
    const newEvent = new eventModel({
      ...eventDetails,
      userId: userObjectId,
    });
    await newEvent.save();

    response.message = "Event created successfully";
    response.success = true;
    return response;
  }

  static async updateEvent(data: IEventUserInput): Promise<IResponse> {
    const userExists = await userModel.findOne({ email: data.email });
    if (!userExists) {
      response.message = "User does not exists";
      response.success = false;
      return response;
    }

    const eventExists = await eventModel.findOne({ _id: data.id },{ _id: 0, __v: 0 });
    
    if (!eventExists) {
      response.message = "Event does not exists";
      response.success = false;
      return response;
    }

    if (!eventExists.userId.equals(userExists._id)) {
      response.message = "You are not authorized to update this event";
      response.success = false;
      return response;
    }
    const { email, id, ...updatedEventDetails } = data;

    const updatedEvent = await eventModel.findOneAndUpdate({ _id: data.id },{ $set: updatedEventDetails },{ new: true });

    if (!updatedEvent) {
      response.message = "Failed to update event";
      response.success = false;
      return response;
    }
    
    response.message = "Event updated successfully",
    response.data = updatedEvent;
    response.success = true;
    return response;
  }

  static async deleteEvent(data: Partial<IEventByID>): Promise<IResponse> {
    const userExists = await userModel.findOne({ email: data.email });
    if (!userExists) {
      response.message = "User does not exists";
      response.success = false;
      return response;
    }

    const eventExists = await eventModel.findOne({ _id: data.id },{ _id: 0, __v: 0 });
    
    if (!eventExists) {
      response.message = "Event does not exists";
      response.success = false;
      return response;
    }

    if (!eventExists.userId.equals(userExists._id)) {
      response.message = "You are not authorized to delete this event";
      response.success = false;
      return response;
    }

    const deletedEvent = await eventModel.findOneAndDelete({ _id: data.id });

    if (!deletedEvent) {
      response.message = "Failed to delete event";
      response.success = false;
      return response;
    }
    
    response.message = "Event deleted successfully",
    response.success = true;
    return response;
  }
}
export default EventService;
