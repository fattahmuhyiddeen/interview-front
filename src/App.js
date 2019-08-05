/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Provider } from "react-redux";
import configureStore from "./redux";
import { Helmet } from 'react-helmet';
import { Switch, Route, BrowserRouter } from 'react-router-dom';


import HomePage from './containers/home';
import NotFoundPage from './containers/not_found';

import Header from './components/header';

import './style.scss';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.store = configureStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="app-wrapper">
          <Helmet
            titleTemplate="%s - Order Management"
            defaultTitle="Order Management"
          >
            <meta name="description" content="Order Management" />
          </Helmet>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
