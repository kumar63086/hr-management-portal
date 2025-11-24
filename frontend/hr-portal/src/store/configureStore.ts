
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import { rootSaga } from "./saga";
import RegistrationReducer from "./reducers/RegistrationReducer";
import  loginReducer   from "./reducers/LoginuserReduser"
// 1️⃣ Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2️⃣ Redux DevTools extension support
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 3️⃣ Combine reducers
const rootReducer = combineReducers({
  auth: RegistrationReducer,
  login:loginReducer
  // employees: employeeReducer,
});

// 4️⃣ Persist config
const persistConfig = {
  key: "root",
  storage: storageSession,
  // blacklist: ["someReducer"], // optional
};

// 5️⃣ Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 6️⃣ Create store with middleware and enhancers
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// 7️⃣ Run root saga
sagaMiddleware.run(rootSaga);

// 8️⃣ Create persistor for <PersistGate>
export const persistor = persistStore(store);

// 9️⃣ TypeScript types for convenience
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
