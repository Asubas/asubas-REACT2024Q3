import { IDogItem } from './dogInterface';

export interface IContentItemProps {
  item: IDogItem;
  showDetail: (id: string, e?: React.MouseEvent) => void;
}
