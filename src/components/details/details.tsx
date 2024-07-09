import { useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  return (
    <>
      <p>details page {id}</p>
    </>
  );
}

export { Details };
