// import { TAcademicSesmester } from "./academicSemester.interface";
import { Tcode } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterIntoDb = async(payload: Tcode)=> {
    const result = await AcademicSemesterModel.create(payload);
    return result;
};

export const academicSemesterService= {
    createAcademicSemesterIntoDb,
}