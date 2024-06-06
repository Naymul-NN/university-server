import { Student } from "./student.model";


const getAllstudentsFromDb = async () => {
    const result = await Student.find().populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate:{
                path:'academicFacalty',
            }
        })
    return result
}

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({id}).populate('admissionSemester')
    .populate({
        path: 'academicDepartment',
        populate:{
            path:'academicFacalty',
        }
    });
    return result;
}

const deleteSingleStudentFromDB = async (id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
}

export const Studentservices = {
    // createStudentIntoBb,
    getAllstudentsFromDb,
    getSingleStudentFromDB,
    deleteSingleStudentFromDB

}