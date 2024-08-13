// import { useState } from 'react';
// import reactLogo from '../assets/react.svg';
import { useSelector } from 'react-redux';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';
import { WelcomePage } from '../pages/welcomePage/welcomePage';

function Root() {
  const data = useSelector((state: RootState) => state.form.data);
  const location = useLocation();
  const urlParts = location.pathname.split('/');
  return (
    <>
      <Header />
      {!urlParts[1] ? (
        Object.keys(data[0]).length !== 0 && Object.keys(data[1]).length !== 0 ? (
          <div>Заполненные формы</div>
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
