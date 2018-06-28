import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';

import configureStore from 'store/configureStore';
import rootSaga from 'sagas';

const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(<App store={store} />, document.getElementById('app'));
