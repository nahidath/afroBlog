import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home   from './pages/Home/Home';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Article from './pages/Article/Article';
import Articles from './pages/Articles/Articles';

import NavBar from './components/NavBar/NavBar';
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ContactForm from "./pages/ContactForm";
import {ToastContainer} from "react-toastify";


function App() {
  return (
    <>
    <Header />
    <div id="app">
      <Router forceRefresh={false}>
          <NavBar />
          <div className='section-central'>
            <ToastContainer hideProgressBar={true} />
            <Switch>
              <Route path="/article/:id" exact 
                render={(props) => <Article {...props}/>} />
              <Route path="/articles/:filters" exact 
                render={(props) => <Articles {...props}/>} />
              <Route path='/' exact component={Home} />
              <Route path='/sign-in' component={SignIn} />
              <Route path='/sign-up' component={SignUp} />
              <Route path='/profile' exact
                     render={(props) => <Profile {...props}/>}/>
              <Route path='/contact' component={ContactForm} />
            </Switch>
          </div>
          <Footer />
        </Router>
    </div>
    </>
  );
}

export default App;
