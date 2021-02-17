import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';


const Context = React.createContext(); 

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }
  
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    
    const { authenticatedUser } = this.state;
    
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { //
        signIn: this.signIn,
        signOut: this.signOut,
        goBack: this.previousPage
      }
    }
    
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if(user !== null) {
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      // Set Cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { });
    }
    return user;
  }

  signOut = () => {
    this.setState( () => {
      return {
        authenticatedUser: null,
      }
    });
    Cookies.remove('authenticatedUser');
  }

  previousPage = () => {
    this.history.props.go(-1)
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
