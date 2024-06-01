

export type TMonth = 'january'|'february'|'march'|'april'|'may'|'june'|'july'|'august'|'september'|'october'|'november'|'december' ;
export type TAcademicSesmesterName = 'Autumn'|'summer'| 'fall'
export type Tcode = '01'| '02'| '03'

export type TAcademicSesmester = {
    name : TAcademicSesmesterName,
    code: Tcode,
    year: string,
    startMonth: TMonth,
    endMonth : TMonth,
}