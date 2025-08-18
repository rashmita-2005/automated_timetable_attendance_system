const mongoose=required('mongoose');

const classroomSchema=new mongoose.Schema({
    size:{type:Number,required:true},
    name:{type:String,required:true,unique:true}
});

module.exports=mongoose.model('classroom',classroomSchema);