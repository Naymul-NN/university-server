import Joi from "joi";

const customJoi = Joi.extend((joi) => ({
    type: 'capitalizedString',
    base: joi.string(),
    messages: {
      'capitalizedString.base': '{#label} is not capitalized format',
    },
    validate(value, helpers) {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      if (capitalizedValue !== value) {
        return { value, errors: helpers.error('capitalizedString.base') };
      }
    },
  }));
  
  const userNameSchema = Joi.object({
    fristName: customJoi.capitalizedString().trim().max(20).required().messages({
      'string.max': 'frist name can not be more than 20 characters',
      'any.required': 'you should provide the frist name please',
    }),
    middleName: Joi.string().optional(),
    lastName: Joi.string().required().regex(/^[a-zA-Z]+$/).messages({
      'any.required': 'last name is required',
      'string.pattern.base': '{#value} is not valid',
    }),
  });
  
  const gaurdianSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'any.required': 'fatherName is required',
    }),
    motherName: Joi.string().required().messages({
      'any.required': 'motherName is required',
    }),
    fatherContactNo: Joi.string().required().messages({
      'any.required': 'fatherContactNo is required',
    }),
    motherContactNo: Joi.string().required().messages({
      'any.required': 'motherContactNo is required',
    }),
    fatherOccupation: Joi.string().required().messages({
      'any.required': 'fatherOccupation is required',
    }),
    motherOccupation: Joi.string().required().messages({
      'any.required': 'motherOccupation is required',
    }),
  });
  
  const localgaurdianSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'name is required',
    }),
    occupation: Joi.string().required().messages({
      'any.required': 'occupation is required',
    }),
    contactNo: Joi.string().required().messages({
      'any.required': 'contactNo is required',
    }),
    address: Joi.string().required().messages({
      'any.required': 'address is required',
    }),
  });
  
  const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      'any.required': 'id is required',
    }),
    name: userNameSchema.required().messages({
      'any.required': 'name is required',
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
      'any.required': 'gender is required',
      'any.only': '{#value} is not valid',
    }),
    dateofBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
      'any.required': 'email is required',
      'string.email': '{#value} is not a valid email',
    }),
    contactNumber: Joi.string().required().messages({
      'any.required': 'contactNumber is required',
    }),
    emargencyContactNo: Joi.string().required().messages({
      'any.required': 'emargencyContactNo is required',
    }),
    bloodgroup: Joi.string().valid('A+', 'B+', 'AB+', 'O-').optional(),
    presentAddress: Joi.string().required().messages({
      'any.required': 'presentAddress is required',
    }),
    permanantAddress: Joi.string().required().messages({
      'any.required': 'permanantAddress is required',
    }),
    gaurdian: gaurdianSchema.required().messages({
      'any.required': 'gaurdian is required',
    }),
    localgaurdian: localgaurdianSchema.required().messages({
      'any.required': 'localgaurdian is required',
    }),
    profileIma: Joi.string().optional(),
    isActive: Joi.string().valid('isActive', 'inActive').default('isActive'),
  });

  export default studentValidationSchema;
  