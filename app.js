// Task1: initiate app and run server at 3000
const express = require("express");
const app = new express();

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import model file
const TestData = require("./model/TestData")
const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));
// Task2: create mongoDB connection 

mongoose.connect("mongodb+srv://Anagha:anagha110@cluster0.p9jvv4r.mongodb.net/EmployeeData?retryWrites=true&w=majority");

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
    const data = await TestData.find();
    res.send(data);
})


//TODO: get single data from db  using api '/api/employeelist/:id'


//  app.get('/api/employeelist/:id',(req, res) => {
//     var id=req.params.id
//     var data=req.body
//     TestData.findone({"id":id},data,(err,data)=>{
//         if (err) {
//             res.json({"status":"error","error":err})
//         } else {
//             res.json(data); 
//         }
//     })
// })


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', (req, res) => {
    var item = {
        name: req.body.name,
        location: req.body.location,
        position: req.body.position,
        salary: req.body.salary
    }
    var Data = TestData(item);
    Data.save();
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',(req,res)=>{
    var id=req.body.id
    var data=req.body
    TestData.findOneAndDelete({"id":id},data,(err,data)=>{
        if (err) {
            res.json({"status":"error","error":err})
        } else {
            res.json({"status":"deleted","data":data}); 
        }
    })
})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist",(req,res)=>{
    var name=req.body.name
    var data=req.body
    TestData.findOneAndUpdate({"name":name},data,(err,data)=>{
        if (err) {
            res.json({"status":"error","error":err})
        } else {
            res.json({"status":"updated","data":data}); 
        }
    })
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, () => {
    console.log("server listening to port 3000");
})

