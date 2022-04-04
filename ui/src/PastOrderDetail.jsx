
import React from 'react';
import { Link } from 'react-router-dom';
import graphQLFetch from './GraphQLFetch.js';
import ContactInfo from './ContactInfo.jsx';
import OrderDetail from './OrderDetail.jsx';

class PastOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.match.params.id,
      order: [],
      date: [],
      dishes: [],
    }
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      orderById(id: ${this.state.orderId}) {
       name, email, method, created_time, dishes,
      }
    }`
    const data = await graphQLFetch(query);
    if (data) {
      const date = data.orderById.created_time;
      const dateString = date.toDateString();
      const dishesString = data.orderById.dishes;
      const dishes = JSON.parse(dishesString);
      this.setState({ order: data.orderById, date: dateString, dishes: dishes });
    }
  }

  calculateTotalPrice(dishes) {
    let totalPrice = 0;
    dishes.map(dish => {
      var result = dish.price * dish.quantity
      totalPrice = totalPrice + result;
    })
    return totalPrice;
  }

  render() {
    const contactInfo = {
      name: this.state.order.name,
      email: this.state.order.email,
      payment: this.state.order.method,
    }
    const price = this.calculateTotalPrice(this.state.dishes);
    return (
      <React.Fragment>
      <h2>Order #{this.state.orderId} Details</h2>
      <OrderDetail id={this.state.orderId} />
      <hr />
      <h4>Total Price: ${price}</h4>
      <hr />
      <h4>Order Date: {this.state.date}</h4>
      <hr />
      <h4>Contact Informtion</h4>
      <ContactInfo info={contactInfo} />
      <div align="center">
        <Link to="/AccountInformation">
          <button class="btn btn-primary">BACK</button>
        </Link>
      </div>
    </React.Fragment>
    );
  }
}

export default PastOrderDetail;
