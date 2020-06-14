import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Dashboard from './container/Dashboard/Dashboard' 
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import InputContainer from './component/InputContainer/InputContainer'
import './App.css'
import Navbar from './component/Navbar/Navbar';
import Login from './component/LoginForm/LoginForm';
import Signup from './component/SignupForm/SignupForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='Greeting'>
        {/* <p>Expanse Tracker by <a href='www.paragrudani.com'>Parag Rudani</a></p> */}
        <h1><Link to='/signup'>Sign Up</Link></h1>
        <h1><Link to='/'>Go to Home</Link></h1>
      </div>

      <Switch>
        <Route path='/signup' render={() => <Signup />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/' exact render={() => <Dashboard />} />
      </Switch>
        <Route path='/add' render={() => <InputContainer />} />
    </div>
  );
}

export default App;
