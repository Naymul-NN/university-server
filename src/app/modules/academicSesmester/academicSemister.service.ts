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

// get all semester\

const getAllSemesterFromDb = async()=>{
    const result = await AcademicSemesterModel.find()
    return result
}

// get single academic semester
const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemesterModel.findById(id);

    return result;
}

// update
const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSesmester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };

export const academicSemesterService= {
    createAcademicSemesterIntoDb,
    getAllSemesterFromDb,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}