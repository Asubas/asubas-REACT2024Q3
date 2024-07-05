import './errorBoundary.scss';
import { PureComponent, ReactNode } from 'react';
import { ErrorBoundaryButtonState } from '../../interfaces/errorBoundaryInterfaces';
import dogSvg from '../../assets/svg-dog-icon.svg';
class ErrorBoundaryButton extends PureComponent<unknown, ErrorBoundaryButtonState> {
  state: ErrorBoundaryButtonState = {
    isActive: false,
  };

  handleClick = () => {
    this.setState({ isActive: true });
  };

  render(): ReactNode {
    if (this.state.isActive)
      throw new Error('Error when trying to load a DOM tree or its children');
    return (
      <button className="check-error-boundary_button" type="button" onClick={this.handleClick}>
        Check Error Boundary
        <img className="check-error-boundary_svg" src={dogSvg} alt="dog svg labrador" />
      </button>
    );
  }
}

export { ErrorBoundaryButton };
