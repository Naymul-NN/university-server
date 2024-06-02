import { TAcademicFacalty } from "./academicFacalty.interface";
import { AcademicFacaltyModel } from "./academicFacalty.model";

const createAcademicFacaltyIntoDb = async (payload: TAcademicFacalty) => {

    const result = await AcademicFacaltyModel.create(payload);
    return result;
};

// get all semester\
const getAllacademicFacaltyFromDb = async () => {
    const result = await AcademicFacaltyModel.find()
    return result
}

// get single academic semester
const getSingleAcademicFacaltyFromDB = async (id: string) => {
    const result = await AcademicFacaltyModel.findById(id);

    return result;
}

// update
const updateAcademicFacaltyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFacalty>,
) => {

    const result = await AcademicFacaltyModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const academicFacaltyService = {
    createAcademicFacaltyIntoDb,
    getAllacademicFacaltyFromDb,
    getSingleAcademicFacaltyFromDB,
    updateAcademicFacaltyIntoDB
}