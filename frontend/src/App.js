import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Basket from './components/Basket'
import Home from './components/Home'
import Checkout from './components/Checkout'
import Login from './components/Login'
import ProductDetail from './components/ProductDetail'
import Signup from './components/Signup'
import Cookies from 'universal-cookie';
import { ACCESS_TOKEN } from './constants';
import { getCurrentUser } from './utils/APIUtils';

const cookies = new Cookies();


cookies.set('cookieID', '1', { path: '/' });


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
 
  }


    loadCurrentUser() {
      getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })

      console.log("current user: "+ this.state.currentUser);
      console.log("isAuthenticated "+ this.state.isAuthenticated);
    }

componentDidMount() {
    console.log("cookieID", cookies.get('cookieID'));
    this.loadCurrentUser();

    
}


handleLogout() {
  localStorage.removeItem(ACCESS_TOKEN);

  this.setState({
    currentUser: null,
    isAuthenticated: false
  });

  
}

handleLogin() {
  this.loadCurrentUser();
 
}

	
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      
        <Navbar isAuthenticated={this.state.isAuthenticated} 
            currentUser={this.state.currentUser} 
            onLogin={this.handleLogin}
            onLogout={this.handleLogout} />
       
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/basket" component={Basket}/>
              <Route path="/products/:id" component={ProductDetail} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
       </div>
 </BrowserRouter>
    );
  }
}

export default App;
