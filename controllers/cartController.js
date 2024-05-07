const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const addItem=async (req,res)=>{
    try{
       const email=req.params.userEmail
       const user=await User.findOne({email:email})
       if(!user)
       {
           return res.status(404).json({message:"user not found"});  
       }
       console.log(user._id);
       let cart=await Cart.findOne({user_id:user._id})
       console.log(cart);
       if(!cart)
       {
           const userCart=new Cart({user_id:user._id,items:req.body.items})
           await userCart.save()
           return  res.json(userCart)
       }

    //    const item={user_id:cart.user_id,items:{...req.body.items}}
    //   // console.log(item);
    //    cart.items.push(item)
    //    console.log(cart);
  
    //    console.log(user_id);
    let index= cart.items.findIndex(item=>item.itemId===req.body.items.productId)
    if(index===-1)
    {
        index=cart.items.length
        cart.items[index]={...req.body.items}
        
    }
    else
    {cart.items[index].quantity+=1;
res.json(cart)

}
       await cart.save();

 }
   catch(err)
   {return res.status(400).json({ message: "Invalid" });}
}

const deleteItem=async(req,res)=>
{
    try{
        const email=req.params.userEmail
        const itemId=req.params.itemId
        const user=await User.findOne({email:email})
        if(!user)
        {
            return res.status(404).json({message:"user not found"});  
        }
        
        let cart=await Cart.findOne({user_id:user._id})
        if(!cart)
        {
            return res.status(404).json({message:"cart not found"});  
        }
        const updatedItems = cart.items.filter((item) => item.productId.toString() !== itemId); // Ensure type safety

        // Update cart.items with filtered items
        cart.items = updatedItems;
        await cart.save();
       
        res.json({message:"item is removed"});
    }
    catch (error) {
        return res.status(400).json({ message: "Invalid Id" });
    
    }
    
}
const deleteCart=async (req,res)=>{
    try{
    const cartId=req.params.cartId
    const email=req.params.userEmail
    const user= await User.findOne({email:email})
    if(!user)
    {
        return res.status(404).json({message:"user not found"});  
    }
    let cart=await Cart.findOne({user_id:user._id})
    if(!cart)
    {
        return res.status(404).json({message:"cart not found"});  
    }
    const del=await Cart.findByIdAndDelete(cartId)
    res.json({message:"im here"})
}
    catch(err)
    {
        return res.status(400).json({ message: "Invalid Id" }); 
    }
}
const updateCart=async (req,res)=>{
    try{
        const itemId=req.params.itemId
        const email=req.params.userEmail
        const updateitem=req.body.items
        const user= await User.findOne({email:email})
        if(!user)
        {
            return res.status(404).json({message:"user not found"});  
        }
        let cart=await Cart.findOne({user_id:user._id})
    if(!cart)
    {
        return res.status(404).json({message:"cart not found"});  
    }
    const index=cart.items.findIndex(item =>item.productId===itemId);
    console.log(index);
    if(index=== -1)
    {
        return res.status(404).json({message:"item not found "})
    }
    //delete this item in this index
    cart.items[index]=cart.items.splice(index)
    // cart.items[index] = { ...cart.items[index], ...updateitem };
    cart.items[index] ={...updateitem} ;
    console.log(cart);
        await cart.save();

        res.status(200).json({ message: 'Item updated successfully', updatedItem: cart.items[index] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }


}
module.exports={
    updateCart,
    deleteItem,
    addItem,
    deleteCart
}