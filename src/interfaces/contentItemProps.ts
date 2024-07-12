import { IDogItem } from './dogInterface';

export interface IContentItemProps {
  item: IDogItem;
  showDetail: (id: string) => void;
}
