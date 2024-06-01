
import { Schema, model } from "mongoose";
import { TAcademicSesmester,  } from "./academicSemester.interface";
import { months, semesterCode, semesterName } from "./academicSemester.constent";



const academicSchema = new Schema<TAcademicSesmester>({
    name: {
        type : String,
        required: true,
        enum: semesterName,
    },
    year: {
        type : String,
        required: true,
    },
    code : {
        type : String,
        required: true,
        enum: semesterCode,
    },
    startMonth: {
        type : String,
        required: true,
        enum: months,
    },
    
    endMonth: {
        type : String,
        required: true,
        enum: months,
    },
    
   
},
{
    timestamps:true
});
// check the name of course and year

academicSchema.pre('save',async function (next){
    const isSemesterExists = await AcademicSemesterModel.findOne({
        year: this.year,
        name: this.name})

        if(isSemesterExists){
            throw new Error('Semester is alrady exists !')
        }
        next();
})


export const AcademicSemesterModel = model<TAcademicSesmester>('AcademicSemester', academicSchema)