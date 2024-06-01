import { TAcademicSesmesterName, TAcademicSesmesterNameCodeMapper, TMonth, Tcode } from "./academicSemester.interface"

export const months : TMonth[] =[
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
]
export const semesterName: TAcademicSesmesterName[] = [
    'Autumn',
    'fall',
    'summer'
]
export const semesterCode: Tcode[]=[
    '01',
    '02',
    '03',
]


export const academicSemesterNameCodeMapper:TAcademicSesmesterNameCodeMapper = {
    Autumn: '01',
    summer: '02',
    fall: '03'
 }
