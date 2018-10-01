/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LegendsPage from 'containers/LegendsPage/Loadable';
import RulesPage from 'containers/RulesPage/Loadable';
import InfoPage from 'containers/InfoPage/Loadable';
import RegistrationPage from 'containers/RegistrationPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';

const App = () => (
  <div id="app-wrapper">
    <Helmet
      titleTemplate="Malenovská 2018 - %s"
      defaultTitle="Malenovská 2018"
    >
      <meta name="description" content="Malenovská je dřevárnou pro začátečníky i veterány" />
    </Helmet>
    <Route path="/bitva" component={Header} />
    <div id="app-content">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/bitva/legends" component={LegendsPage} />
        <Route path="/bitva/rules" component={RulesPage} />
        <Route path="/bitva/info" component={InfoPage} />
        <Route path="/bitva/registration" component={RegistrationPage} />
        <Route component={NotFoundPage} />
      </Switch>
    <Route path="/bitva" component={Footer} />
    </div>
  </div>
);

export default App;
