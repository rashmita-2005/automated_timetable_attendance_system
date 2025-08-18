const mongoose=required('mongoose');
const bcrypt=required('bcrypt');

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

userSchema.pre('save', async function(next){
    if(!this.isModified('passwordHash')){
        return next();
    }
    this.passwordHash=await bcrypt.hash(this.passwordHash,10);
    next();
});

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.passwordHash);
}

module.exports=mongoose.model('user',userSchema);