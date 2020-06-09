import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import View from './View'
import Add from './Add'
import Edit from './Edit'

class Main extends Component {

  render() {
    return (
      <div>
        <Switch>
            <Route exact path="/" component={View}></Route>
            <Route path="/add" component={Add}></Route>
            <Route path="/edit" component={Edit}></Route>
        </Switch>
      </div>
    );
  }
}

export default Main;
