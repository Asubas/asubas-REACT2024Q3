import './contentSection.scss';
import { PureComponent, ReactNode } from 'react';
import { IDogItem } from '../../interfaces/dogInterface';

class ContentSection extends PureComponent<{ data: IDogItem[] }> {
  render(): ReactNode {
    const { data } = this.props;
    return (
      <>
        <section className="content">
          {data &&
            data.map((item: IDogItem, index: number) => (
              <div className="content_item" key={item.id}>
                <img
                  className="content_item__picture"
                  src={item.url}
                  alt={`Dog ${index}`}
                  width={item.width}
                  height={item.height}
                />
                <p className="content_item__title">{item.breeds[0].name}</p>
              </div>
            ))}
        </section>
        <div className="pagination"></div>
      </>
    );
  }
}

export { ContentSection };
