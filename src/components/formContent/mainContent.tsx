import { useLocation } from 'react-router-dom';
import { RegularFormComponent } from '../forms/regularFormComponent';
import { HookFormComponent } from '../forms/hookFormComponent';

function MainContent() {
  const location = useLocation();
  const urlParts = location.pathname.split('/');

  return (
    <>
      {urlParts[2] === 'reactHookForm' && <HookFormComponent />}

      {urlParts[2] === 'uncontrolledForm' && <RegularFormComponent />}
    </>
  );
}

export { MainContent };
