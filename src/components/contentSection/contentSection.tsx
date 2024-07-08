import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { ErrorBoundaryButton } from '../errorBoundary/errorBoundaryButton';

function ContentSection({ data }: { data: IDogItem[] }) {
  return (
    <>
      <section className="content">
        <ErrorBoundaryButton />
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

export { ContentSection };
