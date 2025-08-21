const mongoose = require('mongoose');

const classroomSchema=new mongoose.Schema({
    size:{type:Number,required:true},
    name:{type:String,required:true,unique:true}
});

module.exports=mongoose.model('classroom',classroomSchema);
