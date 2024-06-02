
import config from "../../config";
import { AcademicSemesterModel } from "../academicSesmester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Tuser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


const createStudentIntoBb = async (password: string, payload: TStudent) => {

    const userData : Partial<Tuser> = {};

    // if password is not given , use deafult password
    if(!password){
        userData.password = config.default_pass as string ;
    }else{
        userData.password = password
    }

    // set student role
     userData.role = 'student';

//    find academid semester info
const admissionSemester= await AcademicSemesterModel.findById(payload.admissionSemester)

 userData.id = await generateStudentId(admissionSemester);

    //  create a user
    const newUser = await User.create(userData)


    // create a student
    if (Object.keys(newUser).length){
        // set id, _id as user
        payload.id = newUser.id;

        payload.user = newUser._id; //refarence id


        const newStudent = await Student.create(payload);

        return newStudent;
    }
   
}

export const UserServices = {
    createStudentIntoBb
}