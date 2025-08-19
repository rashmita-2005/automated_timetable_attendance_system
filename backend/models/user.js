const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, required:true},
    passwordHash:{type:String, required:true},
    role:{type:String,enum:['admin','faculty','student'],required:true},
    availability:[
        {
            day:{type:String},
            slot:[String]
        }
    ],
    createdAt:{type:Date,default:Date.now}
});



userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.passwordHash);
}
const userModel=mongoose.model('user',userSchema);
module.exports={
    userModel
};