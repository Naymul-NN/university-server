
import { Schema, model } from "mongoose";
import { Tuser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'
import { UserStatus } from "./user.constant";

const userSchema = new Schema<Tuser, UserModel>({
    id : {
        type : String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type : String,
        required: true,
        select: 0,
    },
    needsPsswordChange : {
        type : Boolean,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
      },
    role: {
        type : String,
        enum: ['superAdmin', 'student', 'faculty', 'admin'],
    },
    status:{
        type: String,
        enum:UserStatus,
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

},
{
    timestamps:true
});

//  pre save middleware/hook : will work on create() save()
userSchema.pre ('save',async function(next){
    // hashing password and save into db 
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
   user.password =await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))

next()
})

// post save middleware / hook
userSchema.post('save', function(doc,next){
    doc.password = ''
    next();
})
userSchema.statics.isUserExistsByCustomId = async function(id:string){
    return await User.findOne({id}).select('+password');
}

userSchema.statics.isPasswordMatched = async function(plainTextPassword, hashedPassword){
   return await bcrypt.compare(plainTextPassword, hashedPassword) 

}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };

export const User = model<Tuser,UserModel>('user', userSchema);