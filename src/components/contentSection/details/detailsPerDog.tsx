import { useParams } from 'react-router-dom';

function DetailsPerDog() {
  const { id } = useParams();
  return (
    <>
      <p>details page {id}</p>
    </>
  );
}

export { DetailsPerDog };
