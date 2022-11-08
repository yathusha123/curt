// //post
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost:27017/employeDB').then((db)=>{
    console.log("create db");
})
.catch((err)=>{
    console.log(err);
})

const Schema={
  fullName:String,
  email:String,
  salary:Number,
  city:String
}
const newOne = mongoose.model('employes',Schema);


app.post("/post",async(req,res)=>{
  console.log("inserted post");

  const data = new newOne({
    fullName:req.body.fullName,
    email:req.body.email,
    salary:req.body.salary,
    city:req.body.city
  })
  const val =await data.save();
  res.json(val);
})

//get

 
app.get("/getData",(req,res)=>{
  newOne.find((err,val)=>{
      if(err){
          console.log(err);
      }else{
          res.json(val)
      }
  })
})

app.get('/fetch/:city',function(req,res){
  fetchid=req.params.city;
  newOne.find(({city:fetchid}),function(err,value){
    if(err){
      res.sendStatus('error')
    }
    else{ 
    if(value.length==0)
    {
      res.send('data does not exits');
    }
    else{
      res.send(value);
    }
  }
  })
})


//put
// app.put("/update/:city", async (req, res) => {

//     let upfullName= req.body.fullName;
//     let upemail=req.body.email;
//     let upsalary= req.body.salary;
//     let upcity= req.body.city;

//     newOne.findOneAndUpdate({fullName:upfullName},{$set:{email:upemail,salary:upsalary,city:upcity}},
//         {new:true},(err,data)=>{
//             if(err){
//                 res.send("ERROR")
//             }else{
//             if(data==null){
//                 res.send("nothing found")
//             }else{
//                 res.send(data)
//             }
//         }
//         })
// }) 

// //delete
// app.delete('/del/:city',function(req,res){
//     let delcity=req.params.city;
//     newOne.findOneAndDelete(({city:delcity}),function(err,docs){
//         if (err){
//             res.send("ERROR")
//         }else{
//         if(docs==null){
//             res.send("wrong")
//         }
//         else{
//             res.send("deleted");
//         }
//     }
//     })
// })
app.listen(2002,()=>{
    console.log("port 2001");
  })