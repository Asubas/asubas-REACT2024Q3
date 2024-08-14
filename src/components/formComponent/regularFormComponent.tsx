import { useDispatch, useSelector } from 'react-redux';
import './FormComponent.scss';
import { Form, useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { setCountries } from '../../app/slices/CountrySlices';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

function RegularFormComponent() {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
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
        .required()
        .matches(/^[A-Z]/, 'The first letter must be capitalized!'),
      age: Yup.number().integer().positive('The number must be positive'),
    });

    try {
      await formSchema.validate(
        {
          name: formData.get('name'),
          age: formData.get('age'),
        },
        { abortEarly: false },
      );
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

  return (
    <Form
      method="get"
      action="/"
      className="regularForm"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Enter your real name:</label>
      <input
        className="originName"
        id="name"
        type="text"
        name="name"
        placeholder="Please enter you origin name"
        autoComplete="on"
        required
      />
      {errors.name && <span className="error-message">{errors.name}</span>}
      <label htmlFor="age">Enter your real age:</label>
      <input type="number" id="age" name="age" placeholder="Please enter your age" required />
      {errors.age && <span className="error-message">{errors.age}</span>}
      <label htmlFor="email">Enter your real email:</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Please enter your email"
        autoComplete="on"
      />
      <label htmlFor="password">Come up with password:</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Please enter your password"
        autoComplete="on"
      />
      <label htmlFor="confirmPassword">Confirm your password:</label>
      <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        placeholder="Please confirm your password"
      />
      <label htmlFor="sex">Enter your real sex (male / female):</label>
      <input className="sex" id="sex" type="checkbox" name="sex" />
      <label htmlFor="tc">Please read TS:</label>
      <input className="tc" id="tc" type="checkbox" name="TC" />
      <label htmlFor="file">Choose your real avatar from png/jpeg type:</label>
      <input id="file" type="file" name="fileLoader" accept="image/jpeg,image/png" />
      <label htmlFor="country">Select a country:</label>
      <input id="country" list="countries" placeholder="Type to select country" />
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
