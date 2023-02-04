// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { ENVIRONMENT_ENUM } from 'constants/enums';
import rootReducer from './redux/reducers';
import rootSaga from './redux/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const env = process.env.NODE_ENV;

const init = (store: object): mixed => {
  sagaMiddleware.run(rootSaga);
  return store;
};

export default function configureStore1(initialState: object = {}): mixed {
  if (env === ENVIRONMENT_ENUM.development) {
    return import('redux-devtools-extension').then(({composeWithDevTools}: object): mixed => {
      const store = createStore(
        rootReducer(),
        initialState,
        composeWithDevTools(
          applyMiddleware(
            sagaMiddleware,
          ),
        ),
      );

      return init(store);
    });
  }

  const store = createStore(
    rootReducer(),
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  return Promise.resolve(init(store));
}
