import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'

import reducers from "./ducks";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["persist"],
    stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, reducers);

const logger = createLogger({
    collapsed: true
});
const store = process.env.NODE_ENV !== 'production'
    ? createStore(pReducer, applyMiddleware(thunk, logger))
    : createStore(pReducer, applyMiddleware(thunk));
export default () => store;
export const getStore = () => store;
export const persistor = persistStore(store);
