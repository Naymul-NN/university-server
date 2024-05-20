// import { Schema, model, connect } from 'mongoose';

export type Gaurdian = {
    fatherName: string;
    motherName: string;
    fatherContactNo: string;
    motherContactNo: string;
    fatherOccupation: string;
    matherOccupation: string;
}

export type UserName = {
    fristName: string;
    middleName: string;
    lastName: string;
}

export type LocalGaurdian = {
    name: string;
    occupatino: string;
    contactNo: string;
    address: string;
}


export type Student = {
    id: string;
    name: UserName;
    gender: "male"| " female";
     dateofBirth: string;
    email: string;
    contactNumber: string;
    emargencyContactNo: string;
    bloodgroup: " A+"|"B+"|"AB+"|"O-"
    presentAddress: string;
    permanantAddress: string;
    gaurdian: Gaurdian ;
    localgaurdian: LocalGaurdian;
    profileIma?: string;
    isActive: "isActive"|"inActive";
  }