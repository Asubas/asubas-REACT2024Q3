import { useLocation } from 'react-router-dom';
import { RegularFormComponent } from '../formComponent/regularFormComponent';

function MainContent() {
  const location = useLocation();
  const urlParts = location.pathname.split('/');

  return (
    <>
      {urlParts[2] === '2' && (
        <div className="content">Тут будет ваша форма с использованием React Hook Form</div>
      )}

      {urlParts[2] === '1' && <RegularFormComponent />}
    </>
  );
}

export { MainContent };
