export enum formStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TFormProductsItem = {
  id: number;
  title: string;
  price: string;
  description: string;
  published: boolean;
  created: string;
};

export type TFormProductsState = {
  items: TFormProductsItem[];
  status: formStatus;
};

export type TId = {
  id: string | number;
  icon?: boolean;
};

export type TIdType = string | number;
