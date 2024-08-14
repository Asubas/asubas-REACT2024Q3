import { useDispatch, useSelector } from 'react-redux';
import './FormComponent.scss';
import { Form, useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { setCountries } from '../../app/slices/CountrySlices';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { formReducer } from '../../app/slices/FormSlices';

function RegularFormComponent() {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.country.countries);

  useEffect(() => {
    const fetchCountries = () => {
      const allCountries = ['Russia', 'USA', 'Canada', 'UK', 'Germany', 'France'];
      dispatch(setCountries(allCountries));
    };

    fetchCountries();
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
          const file = value as File;
          return file.type === 'image/jpeg' || file.type === 'image/png';
        }),
      TC: Yup.bool().oneOf([true], 'You need open chest!').required('Required'),
    });

    try {
      const TC = formData.get('TC') === 'on';
      const ageValue = e.currentTarget.age.value;
      await formSchema.validate(
        {
          name: formData.get('name'),
          age: ageValue === '' ? undefined : Number(ageValue),
          email: formData.get('email'),
          password: formData.get('password'),
          confirmPassword: formData.get('confirmPassword'),
          file: formData.get('fileLoader'),
          TC: TC,
        },
        { abortEarly: false },
      );
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

  const [type, setType] = useState('password');
  const [typeConfirm, setTypeConfirm] = useState('password');
  const showPassword = () => {
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    setTypeConfirm((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files?.[0] || null;
    setFile(selectedFile);
    setErrors({});
  };

  const resetError = () => {
    setErrors({});
  };

  return (
    <Form
      method="get"
      action="/"
      className="regularForm"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Enter your pirate name:</label>
      <input
        className="originName"
        id="name"
        type="text"
        name="name"
        placeholder="Please enter you origin name"
        autoComplete="on"
        onChange={resetError}
      />
      {errors.name && <span className="error-message">{errors.name}</span>}
      <label htmlFor="age">Enter your age:</label>
      <input
        type="number"
        id="age"
        name="age"
        placeholder="Please enter your age"
        onChange={resetError}
      />
      {errors.age && <span className="error-message">{errors.age}</span>}
      <label htmlFor="email">Enter your email:</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Please enter your email"
        autoComplete="on"
        onChange={resetError}
      />
      {errors.email && <span className="error-message">{errors.email}</span>}

      <label htmlFor="password">Come up with password:</label>
      <input
        id="password"
        type={type}
        name="password"
        placeholder="Please enter your password"
        autoComplete="on"
        onChange={resetError}
      />
      <span className={`${type === 'password' ? 'empty' : 'not-empty'}`} onClick={showPassword} />

      {errors.password && <span className="error-message">{errors.password}</span>}

      <label htmlFor="confirmPassword">Confirm your password:</label>
      <input
        id="confirmPassword"
        type={typeConfirm}
        name="confirmPassword"
        placeholder="Please confirm your password"
        autoComplete="new-password"
        onChange={resetError}
      />
      <span
        className={`${typeConfirm === 'password' ? 'empty' : 'not-empty'}`}
        onClick={showPassword}
      />
      {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}

      <label htmlFor="sex">Enter your sex (male / female):</label>
      <input className="sex" id="sex" type="checkbox" name="sex" />
      <label htmlFor="tc">Please read TS (Open the chest):</label>
      <input className="tc" id="tc" type="checkbox" name="TC" />
      {errors.TC && <span className="error-message">{errors.TC}</span>}
      <label htmlFor="file">Choose your avatar from png/jpeg type:</label>
      <input
        id="file"
        type="file"
        name="fileLoader"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
      />
      {errors.file && <span className="error-message">{errors.file}</span>}
      <label htmlFor="country">Select a country:</label>
      <input name="country" id="country" list="countries" placeholder="Type to select country" />
      <datalist id="countries">
        {countries.map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
      <button className="submitButton" type="submit">
        I want to become a pirate!
      </button>
    </Form>
  );
}

export { RegularFormComponent };
