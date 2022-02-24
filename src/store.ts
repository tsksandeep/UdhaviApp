import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './store/reducers';

export default function configureStore() {
  const composeEnhancers = compose;
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeEnhancers(...enhancers);
  const store = createStore(rootReducer, middlewareEnhancer);
  return store;
}
