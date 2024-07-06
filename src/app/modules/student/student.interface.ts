import { Types } from "mongoose";
import { Schema } from "mongoose";
import { Model } from "mongoose";

export type TGaurdian = {
    fatherName: string;
    motherName: string;
    fatherContactNo: string;
    motherContactNo: string;
    fatherOccupation: string;
    matherOccupation: string;
}

export type TUserName = {
    fristName: string;
    middleName?: string;  // Make middleName optional
    lastName: string;
}

export type TLocalGaurdian = {
    name: string;
    occupatino: string;
    contactNo: string;
    address: string;
}

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    password: string;
    name: TUserName;
    gender: "male" | "female" | "other";  // Correct enum values
    dateofBirth?: string;  // Make optional
    email: string;
    contactNumber: string;
    emargencyContactNo: string;
    bloodgroup?: "A+" | "B+" | "AB+" | "O-";  // Make optional
    presentAddress: string;
    permanantAddress: string;
    gaurdian: TGaurdian;
    localgaurdian: TLocalGaurdian;
    profileIma?: string;
    admissionSemester: Schema.Types.ObjectId;
    isDeleted: boolean;
    academicFaculty: Types.ObjectId;
    academicDepartment:Schema.Types.ObjectId;
}
// for creating static mathod

 export interface StudentModel extends Model<TStudent>{
   // eslint-disable-next-line no-unused-vars
   isUserExists(id: string): Promise<TStudent | null>
}

// for createin instance
// export type StudentMethods = {
//     isUserExits(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<TStudent, Record<string, never> , StudentMethods>