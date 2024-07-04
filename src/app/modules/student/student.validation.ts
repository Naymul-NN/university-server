import { z } from 'zod';


// Define UserName schema
const userNameSchema = z.object({
  fristName: z.string()
    .max(20, 'First name can not be more than 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must be capitalized')
    .nonempty('You should provide the first name'),
  middleName: z.string().optional(),
  lastName: z.string()
    .nonempty('Last name is required')
    .regex(/^[A-Za-z]+$/, 'Last name is not valid')
});

// Define Guardian schema
const gaurdianvalidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  motherName: z.string().nonempty('Mother name is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  matherOccupation: z.string().nonempty('Mother occupation is required'),
});

// Define LocalGuardian schema
const localgaurdianValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  occupatino: z.string().nonempty('Occupation is required'),
  contactNo: z.string().nonempty('Contact number is required'),
  address: z.string().nonempty('Address is required'),
});

// Define Student schema
const createstudentvalidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
   student: z.object({
    name: userNameSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateofBirth: z.string().optional(),
    email: z.string().nonempty('Email is required').email('Email is not valid'),
    contactNumber: z.string().nonempty('Contact number is required'),
    emargencyContactNo: z.string().nonempty('Emergency contact number is required'),
    bloodgroup: z.enum(['A+', 'B+', 'AB+', 'O-']).optional(),
    presentAddress: z.string().nonempty('Present address is required'),
    permanantAddress: z.string().nonempty('Permanent address is required'),
    gaurdian: gaurdianvalidationSchema,
    localgaurdian: localgaurdianValidationSchema,
    admissionSemester: z.string(),
    profileIma: z.string().optional(),
    academicDepartment:z.string({
                invalid_type_error: 'Academic Department name must be string',
                required_error: 'Academic department is require'
    }),
   })
    
  })
});

const updateuserNameSchema = z.object({
  firstName: z.string()
    .max(20, 'First name can not be more than 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must be capitalized')
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string()
    .regex(/^[A-Za-z]+$/, 'Last name is not valid')
    .optional()
});

const updategaurdianvalidationSchema = z.object({
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherContactNo: z.string().optional(),
  fatherOccupation: z.string().optional(),
  motherOccupation: z.string().optional()
});

const updatelocalgaurdianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const updatestudentvalidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: updateuserNameSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateofBirth: z.string().optional(),
      email: z.string().email('Email is not valid').optional(),
      contactNumber: z.string().optional(),
      emargencyContactNo: z.string().optional(),
      bloodgroup: z.enum(['A+', 'B+', 'AB+', 'O-']).optional(),
      presentAddress: z.string().optional(),
      permanantAddress: z.string().optional(),
      gaurdian: updategaurdianvalidationSchema.optional(),
      localgaurdian: updatelocalgaurdianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileIma: z.string().optional(),
      academicDepartment: z.string().optional(),
    }).optional()
  }).optional()
});



// Export the schema
export const studentvalidation = {
  createstudentvalidationSchema,
  updatestudentvalidationSchema
}
