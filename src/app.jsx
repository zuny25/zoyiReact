import React from 'react';
import App from 'container/App';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';


class Root extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default hot(module)(Root);
