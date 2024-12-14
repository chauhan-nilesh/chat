import { Router } from "express";
import { loginCustomer, registerCustomer, verifyCustomer } from "../controllers/customer.controller.js";


const router = Router()

router.route("/register").post(registerCustomer)

router.route("/login").post(loginCustomer)

router.route("/verify").get(verifyCustomer)

export {router as customerRouter}