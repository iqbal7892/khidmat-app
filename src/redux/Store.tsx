import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import authReducer from './reducers/auth';
export interface IReducers {
  pairReducer: any,
  authReducer: any,
  orderBookReducer: any,
  walletReducer: any,
  traderReducer: any,
  userDataReducer: any,
  buySellReducer: any,
  favPairReducer: any,
  languageReducer:any
}

const rootReducer = combineReducers({
  authReducer: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

