import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validateRequest = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
export const validatePathParams = (pathSchema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const paramValidation = pathSchema.validate(req.params);
    if (paramValidation.error) {
        return res.status(400).json({ message: paramValidation.error.details[0].message});
    }
    next();
};
export const validateQueryParams = (querySchema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  
  const queryValidation = querySchema.validate(req.query);
    if (queryValidation.error) {
      return res.status(400).json({ message: queryValidation.error.details[0].message });
    }
    next();
};

export default validateRequest;