
import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon,
  Grid, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInNavItem from './SignInNavItem.jsx';
// import IssueAddNavItem from './IssueAddNavItem.jsx';
import Contents from './Contents.jsx';
import UserContext from './UserContext.js';
// import Search from './Search.jsx';
import graphQLFetch from './GraphQLFetch.js';
import store from './store.js';
// import SignInNavItem from './SignInNavItem.jsx';

function NavBar({ user, onUserChange }) {
  let menuButton;
  if (user.signedIn) {
    menuButton = <LinkContainer to="/Menu">
    <NavItem>Menu Page</NavItem>
  </LinkContainer>
  }
  return (
    <Navbar>
    <Navbar.Header>
      <Navbar.Brand>Restaurant-App</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Home</NavItem>
      </LinkContainer>
      <LinkContainer to="/Register">
        <NavItem>Register</NavItem>
      </LinkContainer>
      <LinkContainer to="/AccountInformation">
        <NavItem>Account Information</NavItem>
      </LinkContainer>

      <LinkContainer to="/Confirmation/2">
        <NavItem>Confirmation Page</NavItem>
      </LinkContainer>

      <LinkContainer to="/PastOrder/2">
        <NavItem>Past Order</NavItem>
      </LinkContainer>

      {menuButton}

      <LinkContainer to="/OrderSummary">
        <NavItem>Order Summary</NavItem>
      </LinkContainer>

      <Nav pullRight>
        <SignInNavItem user={user} onUserChange={onUserChange} />
      </Nav>
    </Nav>
  </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.ccs.neu.edu/NEU-CS5610-SU21/Restaurant-app">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default class Page extends React.Component {
  static async fetchData(cookie) {
    const query = `query { user {
      signedIn givenName name email address phone orderNumbers
    }}`;
    const data = await graphQLFetch(query, null, null, cookie);
    return data;
  }

  constructor(props) {
    super(props);
    const user = store.userData ? store.userData.user : null;
    delete store.userData;
    this.state = { user };
    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    const { user } = this.state;
    if (user == null) {
      const data = await Page.fetchData();
      this.setState({ user: data.user });
    }
  }

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user == null) return null;
    return (
      <div>
        <NavBar user={user} onUserChange={this.onUserChange} />
        <Grid fluid>
          <UserContext.Provider value={user}>
            <Contents />
          </UserContext.Provider>
        </Grid>
        <Footer />
      </div>
    );
  }
}
