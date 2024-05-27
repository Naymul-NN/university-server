import { Schema, model } from 'mongoose';
import { TGaurdian, TLocalGaurdian, TStudent,TUserName, StudentModel } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt'
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
    fristName: {
        type: String,
        maxlength: [20, 'frist name can not be more then 10 chearacter '],
        trim: true,
        required: [true, 'you should provide the frist name please'],
        validate: {
            validator: function (value: string) {
                const fristNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return fristNameStr === value;
            },
            message: '{VALUE} is not capitalize format',
        },
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: '{VALUE} is not valid'
        }
    }
})

const gaurdianSchema = new Schema<TGaurdian>({
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    matherOccupation: {
        type: String,
        required: true,
    },

})

const localgaurdianSchema = new Schema<TLocalGaurdian>({
    name: {
        type: String,
        required: true,
    },
    occupatino: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
})

const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    name: { type: userNameSchema, required: true },

    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            // to take the user wrong information
            message: '{VALUE} is not valid',
        },
        required: true,
    },
    dateofBirth: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not a valid email',
        }
    },
    contactNumber: { type: String, required: true },
    emargencyContactNo: { type: String, required: true },
    bloodgroup: {
        type: String,
        enum: ['A+', 'B+', 'AB+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanantAddress: { type: String, required: true },
    gaurdian: { type: gaurdianSchema, required: true },
    localgaurdian: { type: localgaurdianSchema, required: true },
    profileIma: { type: String },
    isActive: {
        type: String,
        enum: ['isActive', 'inActive'],
        default: 'isActive',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }

})
//  pre save middleware/hook : will work on create() save()
studentSchema.pre ('save',async function(next){
    // console.log(this , 'pre hook : we will save data');

    // hashing password and save into db 
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
   user.password =await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))

next()
})

// post save middleware / hook
studentSchema.post('save', function(doc,next){
    doc.password = ''
    next();
})

// Query middleware
studentSchema.pre('find', function(next){
   this.find({isDeletef: {$ne: true}})
    next();
})


// creating a custom static method

studentSchema.statics.isUserExists = async function(id: string){
    const existingUser = await Student.findOne({id})
    return existingUser;
}

//  custom instance mathod
// studentSchema.methods.isUserExits = async function(id: string) {
//     const existingUser = await Student.findOne({id});

//     return existingUser;
// }

export const Student = model<TStudent,StudentModel>('Student', studentSchema);