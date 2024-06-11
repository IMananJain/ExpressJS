import { Response } from "express";
import { AuthRequest } from "../auth/interfaces";
import EventService from "./service";

export const getEventByID = async (req: AuthRequest, res: Response) => {
  try {
    const body = {
      email: req.email,
      ...req.params,
    };

    const data = await EventService.getEventByID(body);

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(404).json({
        ...data,
        code: 404,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const getAllEvents = async (req: AuthRequest, res: Response) => {
  try {
    const body = {
      email: req.email,
      ...req.query,
    };

    const data = await EventService.getAllEvents(body);

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(404).json({
        ...data,
        code: 404,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const body = {
      email: req.email,
      ...req.body,
    };
    const data = await EventService.createEvent(body);

    if (data.success) {
      res.status(201).json({
        ...data,
        code: 201,
      });
    } else {
      res.status(404).json({
        ...data,
        code: 404,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const body = {
      email: req.email,
      ...req.params,
      ...req.body,
    };
    const data = await EventService.updateEvent(body);

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(404).json({
        ...data,
        code: 404,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const body = {
      email: req.email,
      ...req.params
    };
    const data = await EventService.deleteEvent(body);

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(404).json({
        ...data,
        code: 404,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};