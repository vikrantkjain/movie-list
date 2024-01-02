import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from ".";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import { createStateSyncMiddleware, initStateWithPrevTab } from " ";
import storage from "redux-persist/lib/storage"
import persistStore from "redux-persist/es/persistStore";

const RootReducer= combineReducers({
    auth:authSlice
});

const persistConfig = {
    key: "root",
    storage,
 
  };
  
  const persistedReducer =persistReducer(persistConfig, RootReducer);
  
  const middlewares = [
    createStateSyncMiddleware({
      blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
    }),
  ];

  const defaultMiddleware = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
  

  const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [...defaultMiddleware, ...middlewares],
    
  });
  
  initStateWithPrevTab(store);
  
  export default store;
  
  export const Persistor = persistStore(store);