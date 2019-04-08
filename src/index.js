import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
import App from './App';
import Profile from './components/category';
import Login from './components/Container';


ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login}/>
    </div>
  </HashRouter>,
  document.getElementById("root")
);
