export type ChildrenProp = {
  children: React.ReactNode;
}

export type PromiseReturn<T = null, K=string> = PromiseSuccess<T> | PromiseFailed<K>;

export type PromiseSuccess<T = null> = {
  success: true;
  data: T;
  message?: string | null;
}

export type PromiseFailed<T = string> = {
  success: false;
  error: T;
}