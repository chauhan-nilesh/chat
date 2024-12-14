import { json } from "express";
import { users } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const { name, subdomain, email, password } = req.body;

    try {
        const userCreated = await users.create({
            name,
            subdomain,
            email,
            password
        })

        if (!userCreated) {
            return res.status(400), json({
                statusCode: 400,
                message: "Something went wrong while registering user"
            })
        }

        return res.status(200).json({
            statusCode: 200,
            data: userCreated,
            message: "User registered successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === "" || password === "") {
            res.status(400)
                .json(
                    { statusCode: 400, message: "All fields are required" }
                )
        }

        const emailId = email.trim()
        const userExist = await users.findOne({ email: emailId })

        if (!userExist) {
            return res.status(400).json({
                statusCode: 400,
                message: "User not exist"
            })
        }

        const result = await userExist.isPasswordCorrect(password)

        if (result) {

            const token = await userExist.generateAccessToken()

            return res.status(200).json({
                statusCode: 200,
                data: userExist,
                token,
                message: "User logged in successfully"
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: "Password is invalid"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const verifyUser = async (req, res) => {
    const { token } = req.body;

    try {
        const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!data) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    message: "Invalid token"
                })
        }

        const userData = await users.findById(data._id).populate("customers").select("-password -createdAt")
        return res.status(200).json({
            statusCode: 200,
            data: userData,
            message: "Token verified"
        })
    } catch (error) {
        console.log(error)
    }
}

const subdomainExist = async (req, res) => {
    try {
        const { subdomain } = req.body;

        const user = await users.findOne({ subdomain });

        if (!user) {
            return res.status(404).json({ status: false, message: "Subdomain does not exist" });
        }

        return res.status(200).json({ status: true, data: user, message: "Subdomain exists" });

    } catch (error) {
        console.error("Error checking subdomain existence:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export {
    registerUser,
    loginUser,
    verifyUser,
    subdomainExist
}