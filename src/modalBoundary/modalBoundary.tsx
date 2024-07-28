import './modalBoundary.scss';
import { PureComponent, ReactNode } from 'react';

class ModalBoundary extends PureComponent {
  render(): ReactNode {
    return (
      <div className="modal-boundary">I&apos;m sorry, but we can&apos;t find a dog like that.</div>
    );
  }
}

export { ModalBoundary };
