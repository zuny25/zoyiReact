import React from 'react';
import ReactDOM from 'react-dom';
import App from 'container/App';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import configureStore from 'store/configureStore';
import rootSaga from 'sagas';

const store = configureStore();
store.runSaga(rootSaga);

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const HotApp = hot(module)(ReduxApp);


ReactDOM.render(<HotApp />, document.getElementById('app'));
