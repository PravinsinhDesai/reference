const express= require("express")
const app=express()
const bodyparser=require("body-parser")
const db=require("./db")
var cors = require('cors')

app.use(bodyparser.json())
//to seperate body and params
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors())
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.get("/student",(req, resp)=>{
    const statement="select * from StudentDetails"
    db.execute(statement,(err,data)=>{
        if(err)
        {
            console.log(err)
        }else{
            resp.send(data)
        }       
    })    
})

app.post("/insert",(req,resp)=>{
    const {RollNo,Studname, Course,DOA,marks,Phnno}= req.body
    const statement=`insert into StudentDetails values(${RollNo},'${Studname}','${Course}','${DOA}',${marks},'${Phnno}')`
    db.execute(statement,(err,data)=>{
        if(err)
        {
            console.log(err)
        }else{
            resp.send(data)
        }
    })
})
//login
app.get("/users",(req,resp)=>{
    const statement="select * from studentregistration"
    db.execute(statement,(err,data)=>{
        if(err)
        {
            console.log(err)
        }else{
            resp.send(data)
        }       
    })    
})
app.post("/register",(req,resp)=>{
    console.log(req.body)
    const {PRN,password,confirmpass}=req.body
    const statement=`insert into studentregistration values(${PRN},"${password}","${confirmpass}")`
   // db.query(`insert into studentregistration values(?,?,?);`,[PRN,password,confirmpass])
    db.execute(statement,(err,data)=>{
        if(err)
        {
            console.log(err)
        }else{
            resp.send(data)
        }
    })
})


//for authentication
app.post("/login",(req,resp)=>{
    const{PRN,password}=req.body
    const statement=`select * from studentregistration where PRN=${PRN} and password='${password}'`
    db.execute(statement,(err,data)=>{
        if(err)
        {
            resp.send(err)
        }else{
            console.log(data)
            if(data.length==0)
            {
                resp.send("user does not exist!!!")
            }
            else{
                console.log(data)
                resp.send(data)
                // resp.redirect("/student")
            }
        }
    })
})

app.listen(4000,'0.0.0.0',()=>{
    console.log("web server start at port 4000")
})