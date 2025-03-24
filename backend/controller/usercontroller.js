import User from "../models/usermodel.js"
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const usercontroller = { //usercon object he
        //Byalluser------------
    async getAllUser(req,res) {
        try{
            let alluser = await User.find()
            res.json(alluser)
        }
        catch(err){
            res.status(500).json({message:err.message})

        }
    },


    //By find Id----------------
    async getUserById(req,res) {
        try{
            let Oneuser = await User.findOne({_id: req.params.id})
            res.json(Oneuser)
        }
        catch(err){
            res.status(500).json({message:err.message})

        }
    },

    

    //login------------------
    async loginUser(req,res) {
        let {email,password} = req.body;

        let user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        let validpassword = await bcrypt.compare(password, user.password) //hamne dala wo pass
        if (!validpassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }


        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn:'30d'});
        res.json({token,user})  // frontend ka data frontend ko bhej rae

    },



    //SignUp------------------
    async createUser(req,res) {

         let {name,email,password,profilePicture,age,role} = req.body;
        
        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            profilePicture,
            age,
            role
        })

        // const savedUser = new User({})

        try{
            const savedUser = await newUser.save() //mongodb me save krba diya
            let Res = {
                token:jwt.sign({id: savedUser.id}, process.env.JWT_SECRET, {expiresIn:'30d'}),
                user:savedUser
            }
            res.json(Res) //frontend ko de rae
        }
        catch(err){
            res.status(500).json({message:err.message})

        }
    },



    //updatedUser--------------
    async updatedUser(req, res){
        try{
             let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
             res.json(updatedUser)
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    },



    //deletedUser--------------
    async deletedUser(req, res){
        try{
             let deletedUser = await User.findByIdAndDelete(req.params.id)
             res.json(deletedUser)
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    }

}


export default usercontroller;