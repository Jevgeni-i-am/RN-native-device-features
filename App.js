import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator'
import placesReducer from './store/places-reducer'

import { init } from './helpers/db'

//DB INITIALIZION STARTS
init().then(() => {
  console.log('Initialized database');
}).catch(err => {
  console.log('Initializing failed');
  console.log(err);
})
//DB INITIALIZION ENDS

const rootReducer = combineReducers({
  places: placesReducer
})


const store = createStore(rootReducer, applyMiddleware(ReduxThunk))
export default function App() {
  // every screen in APP, in Navigator, should have access to the 
  // store and to provider we pass store through the store
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
