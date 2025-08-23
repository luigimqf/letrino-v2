"use client";

import { Provider } from "react-redux";
import { persistor, store } from "@/shared/store";
import { ChildrenProp } from "../types";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider({ children }: ChildrenProp) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
