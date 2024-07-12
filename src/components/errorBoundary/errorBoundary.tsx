import './errorBoundary.scss';
import { ErrorInfo, PureComponent } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../interfaces/errorBoundaryInterfaces';
import sadnessDog from '../../assets/sadness-dog.jpg';

class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState(
      {
        error: error,
        errorInfo: errorInfo,
      },
      () => {
        this.forceUpdate();
      },
    );
  }

  handleClickF = () => {
    this.setState(
      {
        error: null,
        errorInfo: null,
      },
      () => {
        this.forceUpdate();
      },
    );
  };

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="error-boundary-content_container">
          <h2 className="error-boundary-content_title">
            Oops! Looks like something went wrong! Want to see details or try reloading the page?
          </h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <div className="error-boundary-content_img">
            <img src={sadnessDog} alt="sadness Dog" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
