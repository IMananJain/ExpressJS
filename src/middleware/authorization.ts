import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig";
import { AuthRequest } from "../features/auth/interfaces";


const { secretKey } = envConfig();

const authProfile = () => async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    if (typeof decodedToken !== "string" && "email" in decodedToken) {
      const email = decodedToken.email;
      if (typeof email === 'string' && email.trim() !== '') {
        req.email = email;
        
        next();
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export default authProfile;
