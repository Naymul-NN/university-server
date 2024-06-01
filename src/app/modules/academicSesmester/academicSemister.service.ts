// import { TAcademicSesmester } from "./academicSemester.interface";
import { academicSemesterNameCodeMapper } from "./academicSemester.constent";
import { TAcademicSesmester} from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

const createAcademicSemesterIntoDb = async(payload: TAcademicSesmester)=> {


if (academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error('Invalid Semester code')
}


    const result = await AcademicSemesterModel.create(payload);
    return result;
};

export const academicSemesterService= {
    createAcademicSemesterIntoDb,
}