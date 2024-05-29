
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Tuser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoBb = async (password: string, studentData: TStudent) => {

    // if(await Student.isUserExists(studentData.id)){
    //     throw new Error ('User already exists')
    // }
    // create a user object
     
    const userData : Partial<Tuser> = {};

    // if password is not given , use deafult password
    if(!password){
        userData.password = config.default_pass as string ;
    }else{
        userData.password = password
    }

    // set student role
     userData.role = 'student';
    //  set manyally generated id
     userData.id = '2030100000'

    //  create a user
    const newUser = await User.create(userData)


    // create a student
    if (Object.keys(newUser).length){
        // set id, _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id; //refarence id

        const newStudent = await Student.create(studentData);
        return newStudent;
    }
   
}

export const UserServices = {
    createStudentIntoBb
}