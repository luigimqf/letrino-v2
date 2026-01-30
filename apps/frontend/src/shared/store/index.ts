import authReducer from "@/features/auth/store/authSlice";
import gameReducer from "@/features/game/store/gameSlice";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.NEXT_PRIVATE_ENCRYPTION_KEY || "default_secret_key",
      onError: (error) => {
        console.error("Encryption Error:", error);
      },
    }),
  ],
  serialize: false,
};

const gamePersistedReducer = persistReducer(persistConfig, gameReducer);

export const store = configureStore({
  reducer: {
    game: gamePersistedReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
