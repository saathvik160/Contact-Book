import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Header from './Components/Header'
import Main from './Components/Main'
import store from './Store/Redux'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    );
  }
}

export default App;