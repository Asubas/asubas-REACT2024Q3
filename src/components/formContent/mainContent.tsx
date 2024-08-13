import { useLocation } from 'react-router-dom';

function MainContent() {
  const location = useLocation();
  const urlParts = location.pathname.split('/');

  return (
    <>
      {urlParts[2] === '2' && (
        <div className="content">Тут будет ваша форма с использованием React Hook Form</div>
      )}

      {urlParts[2] === '1' && (
        <div className="content">
          Тут будет ваша форма с использованием неконтролируемых компонентов
        </div>
      )}
    </>
  );
}

export { MainContent };
