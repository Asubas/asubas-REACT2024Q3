export interface IPageContextInterface {
  isPagination: boolean;
  isReset: boolean;
  setIsReset: (isReset: boolean) => void;
  setIsPagination: (isUse: boolean) => void;
}
