import express from "express";
import HandleErrors from "../../middleware/handleError";
import validateRequest, { validatePathParams, validateQueryParams } from "../../middleware/validation";
import authProfile from "../../middleware/authorization";
import { eventValidationSchema, pathValidationSchema, queryValidationSchema, updateValidationSchema } from "./schema";
import { createEvent, getEventByID, getAllEvents, updateEvent, deleteEvent } from "./controller";

const eventRoutes = express.Router();

eventRoutes.get("/", authProfile(), validateQueryParams(queryValidationSchema),HandleErrors(getAllEvents));
eventRoutes.get("/:id", authProfile(), validatePathParams(pathValidationSchema),HandleErrors(getEventByID));
eventRoutes.post("/create", authProfile(),validateRequest(eventValidationSchema), HandleErrors(createEvent));
eventRoutes.patch("/:id", authProfile(),validateRequest(updateValidationSchema), HandleErrors(updateEvent));
eventRoutes.delete("/:id", authProfile(), HandleErrors(deleteEvent));

export default eventRoutes;