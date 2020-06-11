import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Dashboard from './container/Dashboard/Dashboard' 
import {Route, Switch, Redirect} from 'react-router-dom';
import InputContainer from './component/InputContainer/InputContainer'
import Edit from './component/Edit/Edit';
import './App.css'
import Navbar from './component/Navbar/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='Greeting'>
        <p>Expanse Tracker by <a href='www.paragrudani.com'>Parag Rudani</a></p>
      </div>
        <Route path='/' render={() => <Dashboard />} />
        <Route path='/add' render={() => <InputContainer />} />
    </div>
  );
}

export default App;
