import './formComponents/FormComponent.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import { RootState } from '../../app/store';
import { setCountries } from '../../app/slices/CountrySlices';
import { useEffect, useState } from 'react';
import { useFormSubmit } from './formComponents/submitForm';
import { Meter } from './formComponents/meter';

function RegularFormComponent() {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [file, setFile] = useState<File | null>(null);
  const [meter, setMeter] = useState(false);
  const [passwordMeter, setPasswordMeter] = useState('');
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.country.countries);
  useEffect(() => {
    const fetchCountries = () => {
      const allCountries = ['Russia', 'USA', 'Canada', 'UK', 'Germany', 'France'];
      dispatch(setCountries(allCountries));
    };
    fetchCountries();
  }, [dispatch]);

  const handleSubmit = useFormSubmit(dispatch, setErrors, file);

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
        placeholder="Please enter your origin name"
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

      <label htmlFor="password">
        Come up with password:
        {meter && <Meter password={passwordMeter} />}
      </label>
      <input
        id="password"
        type={type}
        name="password"
        placeholder="Please enter your password"
        autoComplete="on"
        onFocus={() => setMeter(true)}
        onChange={(e) => {
          const newPassword = e.target.value;
          setPasswordMeter(newPassword);
          resetError();
        }}
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
      {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}

      <label htmlFor="sex">Enter your sex (male / female):</label>
      <input className="sex" id="sex" type="checkbox" name="sex" />
      <label htmlFor="tc">Please read TS (Open the chest):</label>
      <input className="tc" id="tc" type="checkbox" name="TC" onChange={resetError} />
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
      <input
        name="country"
        id="country"
        list="countries"
        placeholder="Type to select country"
        onChange={resetError}
      />
      {errors.country && <span className="error-message">{errors.country}</span>}
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
    </Form>
  );
}

export { RegularFormComponent };
