import express from "express";
import { pasteController } from "../controller/paste.controller.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateCreatePaste } from "../middlewares/validateCreatePaste.js";

export const router = express.Router();

const { healthCheck, createPaste, getPaste } = pasteController;

// Health check endpoint to verify service availability
router.get("/healthz", healthCheck);

// Creates a new paste
router.post("/pastes", validateCreatePaste, asyncHandler(createPaste));

// Fetch paste content as JSON
router.get("/pastes/:id", asyncHandler(getPaste));
