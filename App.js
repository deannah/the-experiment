import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import multi from 'redux-multi'

import reducers from './src/reducers';
import Game from './src/components/Game';

export default class App extends Component {
  render() {
    return (
        <Provider store={createStore(reducers, applyMiddleware(multi))}>
            <Game />
        </Provider>
    );
  }
}
