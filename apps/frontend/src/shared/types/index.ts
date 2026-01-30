export type ChildrenProp = {
  children: React.ReactNode;
};

export type ErrorResponse = {
  message: string;
  code: string;
};

export type PromiseReturn<T = null> = {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
};
