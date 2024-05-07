const mongoose = require('mongoose');
const orderSchema= new mongoose.Schema({
    user_id:{
        type:"String",
        required:true
    },
    items:{
        type:"Array",
        required:true
    },
    total_price:{
        type:"Number",
        required:true
    },
    status:{
        type:"String",
        required:true
    },
    created_at:{
        type:"Date",
        default:Date.now()
    },
    delivered_at:{
        type:"Date",
        default: (Date.now())+(5*24*60*60*1000)
    }
});
module.exports=mongoose.model("Order",orderSchema)