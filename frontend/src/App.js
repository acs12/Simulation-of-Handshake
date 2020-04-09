import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import Main from './component/Main';
import { BrowserRouter } from 'react-router-dom';

import {createStore, applyMiddleware, compose} from "redux"
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer'


const middlewares = [thunk]
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composePlugin(applyMiddleware(...middlewares)));

//App Component
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/*Use Browser Router to route to different pages*/}
        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;