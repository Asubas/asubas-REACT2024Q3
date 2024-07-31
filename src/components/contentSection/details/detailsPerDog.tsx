import './detailsPerDog.scss';
import svgDog from '../../../assets/svg-dog-icon.svg';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../../app/slices/detailsSlice';
import { useContext } from 'react';
import { ITheme } from '../../../interfaces/themeProps';
import { ThemeContext } from '../../../pages/[slug]';
import { useRouter } from 'next/router';
import { useFetchDetailsQuery } from '../../../api/api';

function DetailsPerDog() {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: details,
    error: detailsError,
    isFetching: detailsFetching,
  } = useFetchDetailsQuery({ sub_id: slug as string }, { skip: !slug });
  const dispatch = useDispatch();
  const { theme } = useContext<ITheme>(ThemeContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathParts = pathname.split('/');

  const handleClose = () => {
    dispatch(setDetails(''));
    navigate(`/${pathParts[1]}`);
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
