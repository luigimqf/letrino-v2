export type ChildrenProp = {
  children: React.ReactNode;
}

export type PromiseReturn<T, K=string> = PromiseSuccess<T> | PromiseFailed<K>;

export type PromiseSuccess<T> = {
  success: true;
  data: T;
  message?: string | null;
}

export type PromiseFailed<T = string> = {
  success: false;
  error: T;
}