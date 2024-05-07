const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

const login =async (req,res)=>{
    try{
        const email=req.body.email;
        const pass =req.body.password;
        const user=await User.findOne({email:email,password:pass});
        if(!user)
    {
        return res.status(404).json({message:"create an email please"});
    }
    res.json(user)
    }
    catch(err)
    {
        return res.status(404).json(err);
    }
 
}
const register=async (req,res)=>{
    try{
        const email=req.body.email;
        console.log(req.body.email);
        const existUser=await User.findOne({email:email});
        if(existUser)
        {
            return res.status(404).json({message:"user already exist"});
        }
        const newUser=new User({...req.body})
        await newUser.save()
        res.status(201).json({message:"added successfuly"})
    }
    catch(err)
    {  return res.status(404).json(err);}
}
const getProfile=async (req,res)=>{
    try{
        const email=req.params.userEmail;
        const user=await User.findOne({email:email});
        if(!user)
        {
            return res.status(404).json({message:"user not found"});
        }
        console.log(user._id);
        res.json(user)
    }
  catch(err)
  {
    return res.status(404).json(err);
  }
}
const updateProfile=async (req,res)=>{
    try{
        const email=req.params.userEmail;
        const user=await User.findOne({email:email})
        if(!user)
        {
            return res.status(404).json({message:"user not found"});
        }
        const updatedUser=await User.findByIdAndUpdate({_id:user.id},req.body,{new:true})
        res.json(updatedUser)
    }
    catch(err)
    {
        return res.status(404).json(err);
    }
    }
    const userOrder=async (req,res)=>{
        try{
            const email=req.params.email;
            const user= await User.findOne({email:email});
            const orders=await Order.find({user_id:user.id})
            if(!orders)
            {
                
                return res.status(404).json({message:"no orders"})
            }
            res.json(orders)
        }
        catch(err){
            return res.status(400).json({ message: "Invalid" });
        }
    }
    const deleteAccount=async (req,res)=>{
        try{
            const email=req.params.userEmail;
            console.log(email);
            const user= await User.findOne({email:email});
            if(!user)
            {
                return res.status(404).json({message:"user not found"});   
            } 
            const deleteUser=await User.findByIdAndDelete(user._id)
            res.json({message:"deleted successfuly"})
    
        }
        catch(err)
        {
    return res.status(400).json({ message: "Invalid" });
        }
    }
    module.exports={
        login,
        register,
        getProfile,
        userOrder,
        updateProfile,
        deleteAccount
    }