export type ChildrenProp = {
  children: React.ReactNode;
}

export type PromiseReturn<T> = PromiseSuccess<T> | PromiseFailed;

export type PromiseSuccess<T> = {
  success: true;
  data: T;
  message: string;
}

export type PromiseFailed = {
  success: false;
  error: string;
}