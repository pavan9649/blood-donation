const express=require("express");
const path =require("path");
const hbs =require("hbs");
const app=express();

require("./db/conn");
const Register=require("./models/register")
const port=process.env.PORT || 3000;
const static_path=path.join(__dirname, "../public");
const template_path=path.join(__dirname, "../templates/views");
const partials_path=path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.get("/",(req,res)=>{
    res.render(`index`)

})
app.get("/main",(req,res)=>{
   res.render("main");
})
app.post("/main",async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;


        if(password === cpassword){

        const registerBlooddonor=new Register({
            startname : req.body.startname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            bloodgroup :req.body.bloodgroup,
            states: req.body.states,
            district :req.body.district,
            password:password,
            confirmpassword:cpassword

        })
        const registered=await registerBlooddonor.save();
        res.status(201).render(index);
    }
    else{
        res.send("password are not matching");
    }
    }catch(error)
    {
       res.status(400).send(error); 
    }
    
 })


app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})