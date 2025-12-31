import express from "express";
import { pasteController } from "../controller/paste.controller.js";

export const router = express.Router();

router.get("/p/:id", pasteController.viewPaste);
