import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { rootSaga } from "./saga";
import RegistrationReducer from "./reducers/RegistrationReducer";
import loginReducer from "./reducers/LoginuserReduser";
import { employeeReducer } from "./reducers/EmployeReduser";

import { EmployeeUpdateReducer } from "./reducers/EmployeUpdateReducer";
import { EmployeeDeleteReducer } from "./reducers/EmployeeDeleteReducer";
import { EmployeeViewReducer } from "./reducers/EmployeeviewReducer";
import employeeLogoutReducer from "./reducers/EmployeeLogoutReducer";
import EmployeeCreateReducer from "./reducers/EmployeeCreateReducer";

//  Create saga middleware
const sagaMiddleware = createSagaMiddleware();

//  Redux DevTools extension support
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//  Combine reducers
const rootReducer = combineReducers({
   registration: RegistrationReducer,
  login: loginReducer,
  employees: employeeReducer,
  employeeCreate: EmployeeCreateReducer,
  employeeUpdate: EmployeeUpdateReducer,
  employeeDelete: EmployeeDeleteReducer,
  employeeView: EmployeeViewReducer,
   employeeLogout: employeeLogoutReducer, // add logout reducer

});

//  Persist config
const persistConfig = {
  key: "root",
  storage: storageSession,
  
};

//  Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Create store with middleware and enhancers
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

//  Run root saga
sagaMiddleware.run(rootSaga);

//  Create persistor for <PersistGate>
export const persistor = persistStore(store);

//  TypeScript types for convenience
export type RootState = ReturnType<typeof rootReducer>; // or typeof persistedReducer
export type AppDispatch = typeof store.dispatch;
