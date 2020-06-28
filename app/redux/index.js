import { combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import reduxPersist from '../config/reduxPersist'
export const reducers = combineReducers({
    user: require('./userRedux').reducer,
})

export default () => {
    let finalReducers = reducers
    // If rehydration is on use persistReducer otherwise default combineReducers
    if (reduxPersist.active) {
        const { storeConfig } = reduxPersist
        finalReducers = persistReducer(storeConfig, reducers)
    }
    const store = createStore(finalReducers);
    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('./').reducers
            store.replaceReducer(nextRootReducer)
        })
    }
    const persistor = persistStore(store)

    return { store, persistor }
}