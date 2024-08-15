import { useLocation } from 'react-router-dom';
import { RegularFormComponent } from '../regularFormComponent/regularFormComponent';
import { HookFormComponent } from '../hookFormComponent/hookFormComponent';

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
