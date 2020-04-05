import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store/store'
import Main from './component/Main';
import { BrowserRouter } from 'react-router-dom';

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