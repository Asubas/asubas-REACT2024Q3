import * as Yup from 'yup';
import { formReducer } from '../../app/slices/FormSlices';
import { Dispatch, SetStateAction } from 'react';
import { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';

export const useFormSubmit = (
  dispatch: AppDispatch,
  setErrors: Dispatch<SetStateAction<{ [key: string]: string | undefined }>>,
  file: File | null,
) => {
  const navigate = useNavigate();
  const formSchema = Yup.object({
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
    file: Yup.mixed()
      .test('fileSize', 'File size must not exceed 2MB.', function (value) {
        if (!value) return false;
        const file = value as File;
        return file.size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Only JPG and PNG are supported.', function (value) {
        if (!value) return false;
        if (file) return file.type === 'image/jpeg' || file.type === 'image/png';
      }),
    TC: Yup.bool().oneOf([true], 'You need open chest!').required('Required'),
    country: Yup.string().required('This field is required!'),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const TC = formData.get('TC') === 'on';
    const ageValue = e.currentTarget.age.value;

    try {
      await formSchema.validate(
        {
          name: formData.get('name'),
          age: ageValue === '' ? undefined : Number(ageValue),
          email: formData.get('email'),
          password: formData.get('password'),
          confirmPassword: formData.get('confirmPassword'),
          file: formData.get('fileLoader'),
          TC: TC,
          country: formData.get('country'),
        },
        { abortEarly: false },
      );

      const file = formData.get('fileLoader') as File;
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64data = reader.result;
          const payload = {
            name: formData.get('name'),
            age: formData.get('age'),
            email: formData.get('email'),
            password1: formData.get('password'),
            password2: formData.get('confirmPassword'),
            gender: formData.get('sex'),
            profilePicture: base64data,
            country: formData.get('country'),
          };
          dispatch(formReducer(payload));
        };
      }

      setErrors({});
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.reduce((acc: { [key: string]: string }, err) => {
          if (err.path) {
            acc[err.path] = err.message;
          }
          return acc;
        }, {});
        setErrors(errors);
      }
    }
  };

  return handleSubmit;
};
