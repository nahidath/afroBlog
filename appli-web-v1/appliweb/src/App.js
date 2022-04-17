import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Home   from './pages/Home/Home';
import SignUp from './pages/Signup/SignUp';
// import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <div id="app">
      <Router forceRefresh={false}>
        {/* <NavBar /> */}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
