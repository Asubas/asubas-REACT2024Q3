import './detailsPerDog.scss';
import { IOutletContextProps } from '../../../interfaces/outletContentProps';
import { useOutletContext } from 'react-router-dom';
import svgDog from '../../../assets/svg-dog-icon.svg';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../../app/slices/detailsSlice';
import { useContext } from 'react';
import { ThemeContext } from '../../../App';
import { ITheme } from '../../../interfaces/themeProps';

function DetailsPerDog() {
  const dispatch = useDispatch();
  const { details } = useOutletContext<IOutletContextProps>();
  const { theme } = useContext<ITheme>(ThemeContext);

  const handleClose = () => {
    dispatch(setDetails(''));
  };

  if (!details.id) return;

  return (
    <>
      <div className="details">
        <img
          className="details_img"
          src={details.url}
          width={'60%'}
          height={'auto'}
          alt={details.breeds[0].name}
        />
        <div className="details_list-container">
          <dl className={`details_list ${theme}`}>
            <dt>Breed</dt>
            <dd>{details.breeds[0].name}</dd>
            <dt>Weight</dt>
            <dd>{details.breeds[0].weight.metric} kG</dd>
            <dt>Height</dt>
            <dd>{details.breeds[0].height.metric} centimeter</dd>
            <dt>Best suited for</dt>
            <dd>{details.breeds[0].bred_for} </dd>
            <dt>Life span</dt>
            <dd>{details.breeds[0].life_span} years</dd>
            <dt>Temperament</dt>
            <dd>{details.breeds[0].temperament} years</dd>
          </dl>
          <button className="details_close" type="button" onClick={handleClose}>
            Close details
            <img src={svgDog} className="details_close-svg" alt="cute dog" />
          </button>
        </div>
      </div>
    </>
  );
}

export { DetailsPerDog };
