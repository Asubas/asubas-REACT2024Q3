import './detailsPerDog.scss';
import { useParams } from 'react-router-dom';

function DetailsPerDog() {
  const { id } = useParams();
  return (
    <>
      <div className="details">details page {id}</div>
    </>
  );
}

export { DetailsPerDog };
