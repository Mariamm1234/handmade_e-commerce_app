const mongoose = require('mongoose');
//address
const addressSchema=new mongoose.Schema({
    city:{
        type: "String",
        required: true
    },
    area:{
        type: "String",
        required: true
    }
});
//user
const userSchema=new mongoose.Schema({
    name:{
        type: "String",
        required: true
    },
    email:{
        type: "String",
        required: true,
        
    },
    password:{
        type: "String",
        required: true
    },
    shipping_address:addressSchema,
    billing_address:addressSchema,
    type:{
        type:"String",
        reuired:true
    }
})
module.exports=mongoose.model("User",userSchema)