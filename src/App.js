import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Dashboard from './container/Dashboard/Dashboard' 
import {Route, Switch, Redirect} from 'react-router-dom';
import InputContainer from './component/InputContainer/InputContainer'
import Edit from './component/Edit/Edit'

function App() {
  return (
    <div className="App">
        <Route path='/' render={() => <Dashboard />} />
        <Route path='/add' render={() => <InputContainer />} />
    </div>
  );
}

export default App;
