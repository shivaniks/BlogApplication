import User from  '../models/user-model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../models/token.js'


dotenv.config()

const signup=async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password,salt)        
        const newUser= new User({username:req.body.username,name:req.body.name,password:hashed})
        await newUser.save();
        return res.status(200).json({msg:"signup done"})
    }catch(err){
        return res.status(500).json({msg:"unsuccessful"})
    }
}

export const login=async(req,res)=>{
    try{
        let user = await User.findOne({username:req.body.username})
        if(!user){
            return res.status(400).json({msg:"username not found"})
        }
        let match = await bcrypt.compare(req.body.password,user.password)
        if(match){
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'})
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY)
            const newToken =new Token({token:refreshToken})
            await newToken.save();
            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username})
        }else{
            return res.status(400).json({msg:"invalid credentials"})
        }
    }catch(err){
        return res.status(500).json({msg:"unsuccessful"})
    }
}


export default signup