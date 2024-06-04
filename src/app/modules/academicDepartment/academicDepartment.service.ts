import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {

    const result = await AcademicDepartmentModel.create(payload);
    return result;
};

// get all semester\
const getAllacademicDepartmentFromDb = async () => {
    const result = await AcademicDepartmentModel.find()
    return result
}

// get single academic semester
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartmentModel.findById(id);

    return result;
}

// update
const updateAcademicDepartmentIntoDB = async (
    id: string,
    payload: Partial<TAcademicDepartment>,
) => {

    const result = await AcademicDepartmentModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const academicDepartmentService = {
    createAcademicDepartmentIntoDb,
    getAllacademicDepartmentFromDb,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB
}