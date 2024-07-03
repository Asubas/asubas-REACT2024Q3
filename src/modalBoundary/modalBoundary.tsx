import './modalBoundary.scss';
import { Component, ReactNode } from 'react';

class ModalBoundary extends Component {
  render(): ReactNode {
    return (
      <div className="modal-boundary">I&apos;m sorry, but we can&apos;t find a dog like that.</div>
    );
  }
}

export { ModalBoundary };
