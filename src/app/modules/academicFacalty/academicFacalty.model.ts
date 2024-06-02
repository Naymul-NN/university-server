
import { Schema, model } from "mongoose";
import { TAcademicFacalty } from "./academicFacalty.interface";


const academicFacaltySchema = new Schema<TAcademicFacalty>({
    name : {
        type : String,
        required: true,
        unique: true,
    },

},
{
    timestamps:true
});



export const AcademicFacaltyModel = model<TAcademicFacalty>('AcademicFacalty', academicFacaltySchema);