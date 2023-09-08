import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [logger, thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares));

//root reducer
export const store = createStore(persistedReducer,undefined, composedEnhancers);

export const persistor = persistStore(store);