const mongoose=require("mongoose");
const Schema=mongoose.Schema({
name:String,
location:String,
position:String,
salary:Number
})
const TestData=mongoose.model("testdata",Schema);
module.exports=TestData;