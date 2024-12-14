import { json } from "express";
import jwt from "jsonwebtoken";
import { customers } from "../models/customer.model.js";
import { users } from "../models/user.model.js";

const registerCustomer = async (req, res) => {
    const { userId, name, email, password } = req.body;

    try {
        const customerCreated = await customers.create({
            userId,
            name,
            email,
            password
        })

        if (!customerCreated) {
            return res.status(400), json({
                statusCode: 400,
                message: "Something went wrong while registering user"
            })
        }

        const userAdmin = await users.findById(userId);
        userAdmin.customers.push(customerCreated._id);
        await userAdmin.save();

        return res.status(200).json({
            statusCode: 200,
            data: customerCreated,
            message: "Customer registered successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === "" || password === "") {
            return res.status(400)
                .json(
                    { statusCode: 400, message: "All fields are required" }
                )
        }

        const emailId = email.trim()
        const userExist = await customers.findOne({ email: emailId })

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

const verifyCustomer = async (req, res) => {
    try {
        // Extract token from headers or other places
        const token = req.headers['authorization']?.split(' ')[1] || req.body.token || req.query.token;
        
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        // Verify the token
        let data;
        try {
            data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            return res.status(401).json({
                statusCode: 401,
                message: "Invalid or expired token"
            });
        }

        // Find customer data
        const customerData = await customers
            .findById(data._id)
            .populate("userId") // Adjust based on your schema
            .select("-password -createdAt -updatedAt");

        // Check if customer exists
        if (!customerData) {
            return res.status(404).json({
                statusCode: 404,
                message: "Customer not found"
            });
        }

        // Successful response
        return res.status(200).json({
            statusCode: 200,
            data: customerData,
            message: "Token verified"
        });
    } catch (error) {
        // Log and return generic error message
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
};

export {
    registerCustomer,
    loginCustomer,
    verifyCustomer
}