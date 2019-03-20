import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom";
import App from './App';
import Profile from './components/profile';



ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/profile" component={Profile} />
     
    </div>
  </HashRouter>,
  document.getElementById("root")
);
