import { IDogItem } from './dogInterface';

export interface IPageContextInterface {
  setState: React.Dispatch<React.SetStateAction<IDogItem[] | null>>;
}
