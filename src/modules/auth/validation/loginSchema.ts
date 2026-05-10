import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  employeeId: yup
    .string()
    .required('Employee ID is required')
    .trim()
    .min(3, 'Employee ID must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
});