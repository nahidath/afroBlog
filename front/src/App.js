import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import axios from 'axios';

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

import SearchPage from "./pages/SearchPage";
import CGU from "./pages/CGU";
import About from "./pages/About";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials = true;

function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/user/refresh', {
    }).then((res) => {
      console.log(res)
      if (res.data.status === 'success') {
        setUser(res.data.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
    <Header />
    <div id="app">
      <Router forceRefresh={false}>
          <NavBar user={user} setUser={setUser}/>
          <div className='section-central'>
            <ToastContainer hideProgressBar={true} />
            <Switch>
              <Route path="/article/:id" exact 
                render={(props) => <Article {...props} user={user} setUser={setUser} />} />
              <Route path="/articles/:filters" exact 
                render={(props) => <Articles {...props}/>} />
              <Route path='/' exact component={Home} />
              <Route path="/sign-in"  
                render={() => <SignIn setUser={setUser}/>} />
              <Route path='/sign-up' component={SignUp} />
              <Route path='/profile' exact
                     render={(props) => <Profile user={user} setUser={setUser} />}/>
              <Route path='/contact' component={ContactForm} />
              <Route path='/search?s=:word' exact
                     render={(props) =><SearchPage{...props}/>} />
              <Route path='/cgu' component={CGU}/>
              <Route path='/about' component={About}/>
            </Switch>
          </div>
          <Footer />
        </Router>
    </div>
    </>
  );
}

export default App;
