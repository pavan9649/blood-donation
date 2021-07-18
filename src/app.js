
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
//app.set("view engine","hbs");
app.set("view engine","ejs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.get("/",(req,res)=>{
    res.render(`index`);
})
app.post("/",(req,res)=>{
    const dist=req.body.district;
    const place=req.body.state;
    var emp=Register.find({$and:[{states:`${place}`},{district:`${dist}`}]},{_id:0,states:0,district:0});
    emp.exec(function(err,data){
        if(err) throw err;
        console.log(data);
        res.render('table',{records:data});

    })    

    
    });
//module.exports=myArray;

app.get("/main",(req,res)=>{
   res.render("main");
})
app.post("/main",async(req,res)=>{
    try{
        
        

        const registerBlooddonor=new Register({
            startname : req.body.startname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            bloodgroup :req.body.bloodgroup,
            states: req.body.states,
            district :req.body.district
        })
        const registered=await registerBlooddonor.save();
        res.status(201).render('thanks');
    }
    catch(error)
    {
       res.status(400).render('error'); 
    }
    
 })


app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})