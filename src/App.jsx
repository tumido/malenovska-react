import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { CssBaseline, NoSsr, makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LegendsPage from 'containers/LegendsPage/Loadable';
import RulesPage from 'containers/RulesPage/Loadable';
import InfoPage from 'containers/InfoPage/Loadable';
import RegistrationPage from 'containers/RegistrationPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import LoadingIndicator from 'components/LoadingIndicator';

import { setEvent } from './redux/actions';
import { MalenovskaTheme } from './utilities/theme';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#000'
  },
  content: {
    flexGrow: 1,
  }
}));

const BaseEvent = ({ event, allEvents, setEvent }) => {
  React.useEffect(() => { setEvent(event.id); });

  const classes = useStyles();
  return (
    <div className={ classes.root }>
      <Header event={ event } allEvents={ allEvents }/>
      <div className={ classes.content }>
        <Switch>
          <Route path={ `/${event.id}/legends` } render={ (props) => <LegendsPage { ...props } event={ event }/> } />
          <Route path={ `/${event.id}/rules` } component={ RulesPage } />
          <Route path={ `/${event.id}/info` } component={ InfoPage } />
          <Route path={ `/${event.id}/registration` } component={ RegistrationPage } />
          <Redirect from={ `/${event.id}` } to={ `/${event.id}/legends` } />
          <Route component={ NotFoundPage } />
        </Switch>
        <Footer />
      </div>
    </div>
  );
};

BaseEvent.propTypes = {
  event: PropTypes.object,
  setEvent: PropTypes.func,
  allEvents: PropTypes.array
};

const Event = connect(
  state => ({
    allEvents: state.firestore.ordered.events
  }),
  { setEvent }
)(BaseEvent);

const App = ({ events }) => {
  if (!isLoaded(events)) {
    return <LoadingIndicator />;
  }

  return (
    <NoSsr>
      <ThemeProvider theme={ MalenovskaTheme }>
        <CssBaseline />
        <Helmet defaultTitle={ `Malenovská ${ new Date().getFullYear()}` }>
          <meta name="theme-color" content='#0e0a0a' />
        </Helmet>
        <Switch>
          { isLoaded(events) && events.map((event) => (
            <Route
              key={ `route_${event.id}` }
              path={ '/' + event.id }
              render={ (props) => <Event { ...props } event={ event }/> }
            />
          ))}
          <Route exact path='/' component={ LandingPage } />
        </Switch>
      </ThemeProvider>
    </NoSsr>
  );
};

App.propTypes = {
  events: PropTypes.array
};

export default compose(
  firestoreConnect(() => ([
    { collection: 'events' }
  ])),
  connect(state => ({
    events: state.firestore.ordered.events
  }))
)(App);