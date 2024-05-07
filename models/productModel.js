const mongoose = require('mongoose');

//create schema
const productSchema= new mongoose.Schema({
    name:{
        type: "String",
        required: true
    },
    category:{
        type: "String",
        required: true
    },
    sub_category:{
        type: "String",
        required: true
    },
    price:{
        type:"Number",
        required:true
    },
    stok:{
        type:"Number",
        required:true
    },
    size:{
        type:"String",
        default:"one size"
    },
    image:{
        type:"String",
        default:"./download.jpeg"
    }

});
//create model
module.exports = mongoose.model("Product", productSchema);