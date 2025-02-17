import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../authMiddleware.js";
import bcrypt from "bcrypt";    

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    if(!fullname || !email || !password){
        return res.status(400).json({
            status: 400,
            success: false,
            message: "All fields are required"
        });
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({
            status: 400,
            success: false,
            message: "User already exists"
        });
    }   

    const newUser = new User({  fullname, email, password });

    try{
        await newUser.save();
        res.status(200).json({
            message: "Signup successful",
            user: {
              _id: newUser._id,
              email: newUser.email,
            },
          });
    }catch(error){
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error"
        });
    }
}

export const signin = async(req, res) =>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.json({
            status: 400,
            success: false,
            message: "All fields are required"
        });
    }

    try{
        const validUser = await User.findOne({ email });
        if(!validUser){
            return res.json({
                status: 400,
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await validUser.matchPassword(password);
        if(!isMatch){
            return res.json({
                status: 400,
                success: false,
                message: "Invalid credentials"
            });
        }
        await validUser.save();
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        }).json({
            message: 'Signin successful',
            user: {
                _id: validUser._id,
            },
        });
    }catch(error){
        res.json({
            status: 500,
            success: false,
            message: "Internal server error"
        });
    }
}

export const logout = async(req, res) =>{
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path:'/'
    })

    res.status(200).json({
        message: "logout successful",
        isAuthenticated: false
    })
}

export const checkAuth = async(req, res) =>{
    try {
        const token = req.cookies.token;
    
        if (!token) {
          return res.status(200).json({ isAuthenticated: false });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
    
        if (!user) {
          return res.status(200).json({ isAuthenticated: false });
        }
    
        res.status(200).json({ isAuthenticated: true });
      } catch (error) {
        res.status(200).json({ isAuthenticated: false });
      }
}