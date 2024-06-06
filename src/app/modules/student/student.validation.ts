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
    password: z.string().nonempty('password is required'),
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

// Export the schema
export const studentvalidation = {
  createstudentvalidationSchema
}
