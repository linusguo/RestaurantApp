
import React from 'react';
import { Link } from 'react-router-dom';
import ContactInfo from './ContactInfo.jsx';
import PastOrderList from './PastOrderList.jsx';
import graphQLFetch from './GraphQLFetch.js';
import UserContext from './UserContext.js';

class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, pastOrders: [], orderNumbers: [] };
  }

  async componentDidMount() {
    this.loadData();
    const { user } = this.state;
    if (user == null || user === {}) {
      const data = await AccountInfo.fetchData();
      this.setState({ user: data.user });
      this.setState({ user: data.user.orderNumbers });
    }
  }

  async loadData() {
    const userData = this.context;
    const email =  userData.email;
    if (userData) {
      this.setState({
        user: userData,
        orderNumbers: userData.orderNumbers,
      });
    }
    const query = `query {
      ordersByEmail(email: "${email}") {
        id created_time dishes name method
      }
    }`
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ pastOrders: data.ordersByEmail })
    }
  }

  render() {
    const contactInfo = {
      name: this.state.user.name,
      email: this.state.user.email,
      phone: this.state.user.phone,
      address: this.state.user.address,
    }
    return (
      <React.Fragment>
        <h2>Account Information</h2>
        <ContactInfo info={contactInfo} />
        <h2>Past Orders</h2>
        <PastOrderList pastOrders={this.state.pastOrders} />
        <div align="center">
          <Link to="/Menu">
            <button class="btn btn-primary">BACK</button>
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

AccountInfo.contextType = UserContext;

export default AccountInfo;
