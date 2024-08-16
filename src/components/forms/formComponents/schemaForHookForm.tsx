import * as Yup from 'yup';

export const schema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-Z]/, 'The first letter must be capitalized!')
    .required('This field is required!'),
  age: Yup.number()
    .integer()
    .positive('The number must be positive')
    .required('This field is required!'),
  email: Yup.string().email('Please enter correct email').required('This field is required!'),
  password: Yup.string()
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(/[a-z]/, 'The password must contain at least one lowercase letter.')
    .matches(/[A-Z]/, 'The password must contain at least one capital letter.')
    .matches(/[\W_]/, 'The password must contain at least one special character.')
    .required('This field is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords dont match')
    .required('This field is required!'),
  file: Yup.mixed<FileList>()
    .test('fileSize', 'File size must not exceed 2MB.', function (value) {
      if (!value) return false;
      const file = (value as FileList)[0];
      if (file) return file.size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Only JPG and PNG are supported.', function (value) {
      if (!value) return false;
      const file = (value as FileList)[0];
      if (file) return file.type === 'image/jpeg' || file.type === 'image/png';
    })
    .required('This field is required!'),
  TC: Yup.bool().oneOf([true], 'You need open chest!').required('Required'),
  country: Yup.string().required('This field is required!'),
});

export interface FormInputData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  TC: boolean;
  file: FileList;
  country: string;
  profilePicture?: string | null;
  gender?: boolean;
  fileBase64?: string;
}
