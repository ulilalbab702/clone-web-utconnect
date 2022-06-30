import React from 'react';
import './App.css';
import routes from './route';
import {ConnectedRouter} from 'connected-react-router'

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={this.props.history}>
        {routes}
        </ConnectedRouter>
    </div>
  );
}

export default App;
