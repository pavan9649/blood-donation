
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
        has_duplicates:true
    },
    states:{
        type:String,
        required:true

    },
    district :{
        type:String,
        required:true,
        has_duplicates:true
    },
    password:{
        type:String,
        required:true

    },
    confirmpassword:{
        type:String,
        required:true
    }

})
const Register =new mongoose.model("Register",bloodDonerSchema);
module.exports=Register;