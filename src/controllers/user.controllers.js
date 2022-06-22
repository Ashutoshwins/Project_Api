import UserModel from "../models/user.js";
import bcrypt from "bcrypt"

// import jsonwebtoken from "jsonwebtoken";


export default class UserController{

    static UserRegister = async (req,res)=>{
        const{name, email, password, password_confirmation}= req.body
        const user = await UserModel.findOne({email: email})
        if(user){
            res.send({"status": "failed", "message":"Email exist"})
        }else{
            if(name && email && password && password_confirmation){
                if(password === password_confirmation){
                   try{
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const doc = UserModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        
                    })
                    await doc.save()
                    res.send({"status":"sucess","message":" register sucessful"})
                

                   }catch(e){
                       console.log(e)
                        res.send({"status":"failed", "message":"unable to register"})
                   }

                }else{
                    res.send({"status":"faild", "message":"password not match"})
                }

            }else{
            res.send({"status": "failed", "message":"All fields are required"})
            }
        }

        
    }

    static userLogin= async(req,res)=>{
        try{
            const{email, password}= req.body

            if(email && password){
                const user= await UserModel.findOne({email:email})
                if(user!=null){
                    const isMatch = await bcrypt.compare(password, user.password)
                    if((user.email=== email)&& isMatch){
                        res.send({"status":"sucess", "message":"login sucesssful"})

                    }else{
                        res.send({"status":"failed","message":" Email or password not valid"})
                    }

                }else{
                    res.send({"status":"failed","message":"you are Not Registered User"})
                }

            }else{
                res.send({"status": "failed", "message":"All fields are required"})
            }

        }catch(e){
            console.log(e)
            res.send({"status":"failed","mesaage":"unable to login"})
        }
    }
}

// export default UserController/

