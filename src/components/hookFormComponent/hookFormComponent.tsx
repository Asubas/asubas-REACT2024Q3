import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setCountries } from '../../app/slices/CountrySlices';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputData, schema } from './schemaForHookForm';
import { formReducer } from '../../app/slices/FormSlices';
import { useNavigate } from 'react-router-dom';
import { Meter } from './meter';

function HookFormComponent() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [meter, setMeter] = useState(false);
  const [passwordMeter, setPasswordMeter] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormInputData>({ mode: 'onChange', resolver: yupResolver(schema) });

  const handleFormSubmit = async (data: FormInputData) => {
    const reader = new FileReader();
    if (data.file && data.file.length > 0) {
      reader.readAsDataURL(data.file[0]);
      reader.onloadend = () => {
        const base64data = reader.result;
        if (base64data) {
          const formDataWithBase64 = {
            ...data,
            fileBase64: base64data,
            file: undefined,
          };
          dispatch(formReducer(formDataWithBase64));
        }
        navigate('/');
      };
    }
  };
  const countries = useSelector((state: RootState) => state.country.countries);

  const [type, setType] = useState('password');
  const [typeConfirm, setTypeConfirm] = useState('password');
  const showPassword = () => {
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    setTypeConfirm((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  useEffect(() => {
    const fetchCountries = () => {
      const allCountries = ['Russia', 'USA', 'Canada', 'UK', 'Germany', 'France'];
      dispatch(setCountries(allCountries));
    };
    fetchCountries();
  }, [dispatch]);

  return (
    <form className="hookForm" onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="name">Enter your pirate name:</label>
      <input
        id="name"
        type="text"
        placeholder="Please enter your origin name"
        autoComplete="on"
        {...register('name')}
      />
      {errors.name && <span className="error-message">{errors.name.message}</span>}
      <label htmlFor="age">Enter your age:</label>
      <input type="number" id="age" placeholder="Please enter your age" {...register('age')} />
      {errors.age && <span className="error-message">{errors.age.message}</span>}
      <label htmlFor="email">Enter your email:</label>
      <input
        id="email"
        type="email"
        placeholder="Please enter your email"
        autoComplete="on"
        {...register('email')}
      />
      {errors.email && <span className="error-message">{errors.email.message}</span>}
      <label htmlFor="password" className="label-password">
        Come up with password:
        {meter && <Meter password={passwordMeter} />}
      </label>
      <input
        id="password"
        type={type}
        placeholder="Please enter your password"
        autoComplete="on"
        {...register('password')}
        onFocus={() => setMeter(true)}
        onChange={(e) => {
          const newPassword = e.target.value;
          setPasswordMeter(newPassword);
          setValue('password', newPassword);
          trigger('password');
        }}
      />
      <span className={`${type === 'password' ? 'empty' : 'not-empty'}`} onClick={showPassword} />
      {errors.password && <span className="error-message">{errors.password.message}</span>}
      <label htmlFor="confirmPassword">Confirm your password:</label>
      <input
        id="confirmPassword"
        type={typeConfirm}
        placeholder="Please confirm your password"
        autoComplete="on"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <span className="error-message">{errors.confirmPassword.message}</span>
      )}
      <label htmlFor="sex">Enter your sex (male / female):</label>
      <input
        className="sex"
        id="sex"
        type="checkbox"
        {...register('gender', { required: false })}
      />
      <label htmlFor="tc">Please read TS (Open the chest):</label>
      <input className="tc" id="tc" type="checkbox" {...register('TC')} />
      {errors.TC && <span className="error-message">{errors.TC.message}</span>}
      <label htmlFor="fileLoader">Choose your avatar from png/jpeg type:</label>
      <input type="file" id="fileLoader" accept="image/jpeg,image/png" {...register('file')} />
      {errors.file && <span className="error-message">{errors.file.message}</span>}
      <label htmlFor="country">Select a country:</label>
      <input
        id="country"
        list="countries"
        placeholder="Type to select country"
        {...register('country')}
      />
      {errors.country && <span className="error-message">{errors.country.message}</span>}
      <datalist id="countries">
        {countries.map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
      <button
        className="submitButton"
        type="submit"
        disabled={Object.keys(errors).length === 0 ? false : true}
      >
        I want to become a pirate!
      </button>
    </form>
  );
}

export { HookFormComponent };
