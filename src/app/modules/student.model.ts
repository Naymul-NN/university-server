import { Schema, model } from 'mongoose';
import { Gaurdian, LocalGaurdian, Student, UserName } from './student/student.interface';

const userNameSchema = new Schema<UserName>({
    fristName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
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
    id: { type: String },
    name: userNameSchema,
    gender: ["male", " female"],
    dateofBirth: { type: String },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    emargencyContactNo: { type: String, required: true },
    bloodgroup: [" A+", "B+", "AB+", "O-"],
    presentAddress: { type: String, required: true },
    permanantAddress: { type: String, required: true },
    gaurdian: gaurdianSchema,
    localgaurdian: localgaurdianSchema,
    profileIma: { type: String },
    isActive: ["isActive", "inActive"]

})

export const StudentModel = model<Student>('Student', studentSchema);