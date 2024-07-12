import './errorBoundary.scss';
import dogSvg from '../../assets/svg-dog-icon.svg';
import { useState } from 'react';
function ErrorBoundaryButton() {
  const [errorState, setErrorState] = useState(false);

  const handleClick = () => {
    setErrorState(true);
  };

  if (errorState) throw new Error('Error when trying to load a DOM tree or its children');
  return (
    <button className="check-error-boundary_button" type="button" onClick={handleClick}>
      Check Error Boundary
      <img className="check-error-boundary_svg" src={dogSvg} alt="dog svg labrador" />
    </button>
  );
}

export { ErrorBoundaryButton };
