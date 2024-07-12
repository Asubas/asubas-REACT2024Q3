import './detailsPerDog.scss';
import { IOutletContextProps } from '../../../interfaces/outletContentProps';
import { useOutletContext } from 'react-router-dom';
import { useContext } from 'react';
import { IDetailSectionContext } from '../../../interfaces/detailsSectionInterfaces';
import { DetailsContext } from '../../../App';
import svgDog from '../../../assets/svg-dog-icon.svg';

function DetailsPerDog() {
  const { setDetailId } = useContext<IDetailSectionContext>(DetailsContext);
  const handleClose = () => {
    setDetailId('');
  };
  const { details } = useOutletContext<IOutletContextProps>();
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
          <dl className="details_list">
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
