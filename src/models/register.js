
const mongoose=require("mongoose");
const bloodDonerSchema=new mongoose.Schema({
    startname :{
        type:String,
        required:true
    },
    lastname :{
        type:String,
        required:true
    },
    phone :{
        type:Number,
        required:true,
        unique:true
    },

    bloodgroup :{
        type:String,
        required:true,
        unique:false
    },
    states:{
        type:String,
        required:true,
        unique:false

    },
    district :{
        type:String,
        required:true,
        unique:false
    }

})
const Register =mongoose.model("Register",bloodDonerSchema);
module.exports=Register;