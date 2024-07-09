export interface IDogItem {
  breeds: {
    name: string;
    height: {
      imperial: string;
      metric: string;
    };
    weight: {
      imperial: string;
      metric: string;
    };
    bred_for: string;
    life_span: string;
    temperament: string;
  }[];
  height: number;
  width: number;
  id: string;
  url: string;
}
