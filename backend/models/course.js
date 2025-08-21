const mongoose = require('mongoose');
const courseSchema=new mongoose.Schema({
    name:{type:String,required:true},
    code:{type:String,required:true},
    frequency:{type:Number,required:true},
    teacherId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    studentGroupId:{type:mongoose.Schema.Types.ObjectId, ref:'studentGroup',required:true}
});
module.exports=mongoose.model('course',courseSchema);
