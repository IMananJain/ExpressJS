import { Request, Response } from "express";
import AuthService from "./service";
import { AuthRequest } from "./interfaces";

export const signUp = async (req: Request, res: Response) => {
  try {
    const body = {
      ...req.body,
    };
    const data = await AuthService.signUp(body);

    if (data.success) {
      res.status(201).json({
        ...data,
        code: 201,
      });
    } else {
      res.status(409).json({
        ...data,
        code: 409,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const body = {
      ...req.body,
    };
    const data = await AuthService.logIn(body);

    if (data.success) {
      res.status(200).json({
        ...data,
        code: 200,
      });
    } else {
      res.status(409).json({
        ...data,
        code: 409,
      });
    }
  } catch (error: any) {
    const statusCode = error.output?.statusCode ?? 500;
    const errorMessage = error.message ?? "Internal Server Error";
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const updateProfile = async (req: AuthRequest,res: Response) => {
  try {
    const body = {
        email: req.email,
        ...req.body,
    };
    const data = await AuthService.updateProfile(body);

    if (data.success) {
      res.status(202).json({
        ...data,
        code: 202,
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

export const deleteProfile = async (req: AuthRequest,res: Response) => {
  try {
    const body = {
        email: req.email
    };
    const data = await AuthService.deleteProfile(body);

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