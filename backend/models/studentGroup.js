const mongoose=require('mongoose');
const studentGroupSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    size:{type:Number,required:true}
});
module.exports=mongoose.model('studentGroup',studentGroupSchema);