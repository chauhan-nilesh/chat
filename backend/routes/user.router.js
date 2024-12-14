import { Router } from "express";
import { loginUser, registerUser, subdomainExist, verifyUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/verify").post(verifyUser)

router.route("/subdomain").post(subdomainExist)

export {router as userRouter}