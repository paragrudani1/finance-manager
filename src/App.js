import React from 'react';
import Navbar from './component/Navbar/Navbar'
import {BrowserRouter} from 'react-router-dom'
import Dashboard from './container/Dashboard/Dashboard' 
import {Route} from 'react-router-dom';
import InputContainer from './component/InputContainer/InputContainer'
import Edit from './component/Edit/Edit'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route path='/' render={() => <Dashboard />} />
      <Route path='/add' render={() => <InputContainer />} />
      <Route path='/edit' render={() => <Edit />} />
    </div>
  );
}

export default App;
