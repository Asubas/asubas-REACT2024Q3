import { IDogItem } from './dogInterface';

export interface IHeaderProps {
  onDataChange: (data: IDogItem[] | null) => void;
}
