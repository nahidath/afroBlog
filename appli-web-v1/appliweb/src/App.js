import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home   from './pages/Home/Home';
import SignUp from './pages/Signup/SignUp';
import Article from './pages/Article/Article';
import Articles from './pages/Articles/Articles';

import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <div id="app">
      <Router forceRefresh={false}>
          <NavBar />
          <div className='section-central'>
            <Switch>
              <Route path="/article/:id" exact 
                render={(props) => <Article {...props}/>} />
              <Route path="/articles/:filters" exact 
                render={(props) => <Articles {...props}/>} />
              <Route path='/' exact component={Home} />
              <Route path='/sign-up' component={SignUp} />
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
