const mongoose=require('mongoose');
const timetableSchema=new mongoose.Schema({
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:'course',required:true},
    studentGroupId:{type:mongoose.Schema.Types.ObjectId, ref:'studentGroup',required:true},
    classroomId:{type:mongoose.Schema.Types.ObjectId,ref:'classroom',required:true},
    teacherId:{type:mongoose.Schema.Types.ObjectId, ref:'user',required:true},
    time:{type:String,required:true},
    
    day:{type:String,required:true}

});

module.exports=mongoose.model('timetable',timetableSchema);