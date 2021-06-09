const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const categorySchema=Schema({
name:{type:String,required:true,trim:true,maxlength:32,unique:true},

},{timestamps:true}
);

module.exports=mongoose.model("Category",categorySchema)