const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const getAllOrders=async (req,res)=>{
    try{
        const orders= await Order.find();
        if(!orders)
        {
            return res.status(404).json({message:"no orders"})
        }
        res.json(orders)  
    }
   catch(err)
   {
    return res.status(400).json({ message: "Invalid" });
   }
}
const addOrder=async (req,res)=>{
    try{
        const order=new Order(req.body);
        await order.save()
        res.status(201).json(order)
    }
    catch(err)
    {return res.status(400).json({ message: "Invalid" });}
}
const updateOrder=async (req,res)=>{
    try{
        const id=req.params.orderId
const order=await Order.findByIdAndUpdate(id,req.body,{new:true})
res.json(order)
    }
    catch(err)
    {return res.status(400).json({ message: "Invalid" });}
}
const deleteSingleOrder=async (req,res)=>{
    try{
        const id=req.params.orderId
const order=await Order.findByIdAndDelete(id)
if(!order)
{
    return res.status(404).json({message:"no order to remove"})
}
res.json(order)
    }
    catch(err)
    {return res.status(400).json({ message: "Invalid" });}
}
module.exports={
    deleteSingleOrder,
    updateOrder,
    addOrder,
    getAllOrders
}