const mongoose=required('mongoose');

const attendanceSchema=new mongoose.Schema({
    timetableId:{type:mongoose.Schema.Types.ObjectId,ref:'timetable',required:true},
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:'course',required:true},
    studentId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    date:{type:Date,required:true},
    status:{type:String,enum:['present','absent'],required:true}

});
module.exports=mongoose.model('attendance',attendanceSchema);