const mongoose = require('mongoose');
const cart=new mongoose.Schema({
    user_id:{
        type:"String",
        required:true
    },
    items:[]
})
module.exports=mongoose.model("Cart",cart)