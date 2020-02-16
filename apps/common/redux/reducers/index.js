import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as form } from 'redux-form';

import event from './event';
import map from './map';
import participant from './participant';
import notify from './notify';

export default (injectedReducers) => (
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form,
    event,
    map,
    participant,
    notify,
    ...injectedReducers
  })
);