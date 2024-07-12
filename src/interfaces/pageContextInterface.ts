import { IDogItem } from './dogInterface';

export interface IPageContextInterface {
  isPagination: boolean;
  isReset: boolean;
  setIsReset: (isReset: boolean) => void;
  setState: React.Dispatch<React.SetStateAction<IDogItem[] | null>>;
  setIsPagination: (isUse: boolean) => void;
}
