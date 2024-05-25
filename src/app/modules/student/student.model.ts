import { Schema, model } from 'mongoose';
import { Gaurdian, LocalGaurdian, Student, UserName } from './student.interface';
import validator from 'validator';


const userNameSchema = new Schema<UserName>({
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

const gaurdianSchema = new Schema<Gaurdian>({
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

const localgaurdianSchema = new Schema<LocalGaurdian>({
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

const studentSchema = new Schema<Student>({
    id: { type: String, required: true, unique: true },
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

})

export const StudentModel = model<Student>('Student', studentSchema);