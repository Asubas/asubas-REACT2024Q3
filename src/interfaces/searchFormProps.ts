import { IDogItem } from './dogInterface';

export interface ISearchFormProps {
  onDataChange: (data: IDogItem[] | null) => void;
}
