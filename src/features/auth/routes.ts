import express from "express";
import HandleErrors from "../../middleware/handleError";
import { deleteProfile, logIn, signUp, updateProfile } from "./controller";
import { logInValidationSchema, signUpValidationSchema, updateValidationSchema } from "./schema";
import validateRequest from "../../middleware/validation";
import authProfile from "../../middleware/authorization";

const authRoutes = express.Router();

authRoutes.post("/signup", validateRequest(signUpValidationSchema),HandleErrors(signUp));
authRoutes.post("/login", validateRequest(logInValidationSchema),HandleErrors(logIn));
authRoutes.patch("/update-profile", authProfile(),validateRequest(updateValidationSchema),HandleErrors(updateProfile));
authRoutes.delete("/delete-profile", authProfile(),HandleErrors(deleteProfile));

export default authRoutes;