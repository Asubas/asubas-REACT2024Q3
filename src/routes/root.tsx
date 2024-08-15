import { useSelector } from 'react-redux';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { WelcomePage } from '../pages/welcomePage/welcomePage';
import { CompletedForm } from '../components/completedForm/completedForm';

function Root() {
  const data = useSelector((state: RootState) => state.form.data);
  const location = useLocation();
  const urlParts = location.pathname.split('/');
  return (
    <>
      <Header />
      {!urlParts[1] ? (
        Object.keys(data).length !== 0 ? (
          <>
            <h1 className="completedForms-title">Look your pirate command: </h1>
            <div className="contentForms">
              {data.map((el, index) => (
                <CompletedForm key={`${el.email}-${index}`} data={el} />
              ))}
            </div>
          </>
        ) : (
          <WelcomePage />
        )
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
}

export default Root;
