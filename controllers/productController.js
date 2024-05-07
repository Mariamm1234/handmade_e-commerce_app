const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const getAllProducts=async (req,res)=>{
    let product =await Product.find();
    if(!product)
    {
      return res.status(404).json({message:"no products in list"});
    }
    res.json(product)
}
const addProduct=async (req,res)=>{
    // console.log(req.body);
     try {
         let product = new Product(req.body);
         await product.save()
         res.status(201).json(product);
 
     } catch (error) {
         return res.status(400).json(error);
     }
 }
 const getSingleProduct=async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        res.json(product);
    } catch (error) {
        return res.status(400).json({ message: "Invalid Id" });

    }

}
const searchByCategory=async (req,res)=>{
    
    try{
      const category=req.params.category;
        const product=await Product.find({category:category});
        if(!product)
        {
            return res.status(404).json({ message: "product not found" });
        }
        res.json(product);
    }
    catch(err)
    {return res.status(400).json({ message: "Invalid category" });}
}
const updateProduct=async (req,res)=>{
    try{
    const id = req.params.productId;
    let product = await Product.findByIdAndUpdate(id, req.body, { new: true })
res.status(201).json(product)
    }catch (error) {
        return res.status(400).json({ message: "Invalid Id" });

    }

}
const deleteProduct=async (req, res) => {
    try{
    const id = req.params.productId;
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
        return res.status(400).json({ message: "product not found!" });
    }
    res.json({message:"deleted successfuly"});
}
catch (error) {
    return res.status(400).json({ message: "Invalid Id" });

}
}
module.exports={
    getAllProducts,
    getSingleProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchByCategory
}