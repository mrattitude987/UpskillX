import express from 'express'
// import jwt from 'jsonwebtoken'
import 'dotenv/config';

const adminmiddleware = express.Router();

adminmiddleware.use((req, res, next) =>{
    if(req.user.role !== 'admin') {
        return res.status(403).json({message: 'Access denied: Admin only'}),
        next();
    }
})

export default adminmiddleware;