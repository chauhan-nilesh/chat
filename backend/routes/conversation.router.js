import { Router } from "express";
import { getData } from "../controllers/conversation.controller.js";

const router = Router()

router.route("/get-data").post(getData)

export {router as conversationRouter}