/**
 * Created by Anil Jangra on 4/22/2021
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer';
import initialState from './initialState';
import StudentSchedule from '../StudentSchedule/StudentSchedule';

const store = createStore(rootReducer, initialState);

const App = () => (
  <Provider store={store}>
    <StudentSchedule />
  </Provider>
);
if (process.env.NODE_ENV !== 'test') {
  ReactDOM.render(<App />, document.getElementById('root'));
}
export default App;
