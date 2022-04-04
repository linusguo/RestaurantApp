
import React from 'react';
import { Link } from 'react-router-dom';
import OrderDetail from './OrderDetail.jsx';
import ContactInfo from './ContactInfo.jsx';
import graphQLFetch from './GraphQLFetch.js';
import UserContext from './UserContext.js';
import { withRouter } from 'react-router-dom'

class OrderConfirmation extends React.Component {
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
    if (this.state.dishes.length === 0) {
      this.loadData();
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
        <h2>Order Confirmation</h2>
        <h4>Thanks for your order! Your order number is #{this.props.match.params.id}.</h4>
        <hr />

        <OrderDetail id={this.state.orderId} />

        <h4>Total price: ${price}</h4>
        <h4><br></br></h4>
        <h4>Contact Information</h4>
        <ContactInfo info={contactInfo} />
        <div align="center">
          <Link to="/">
            <button class="btn btn-primary">BACK</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

OrderConfirmation.contextType = UserContext;
const OrderConfirmationWrapped = withRouter(OrderConfirmation);
delete OrderConfirmationWrapped.contextType;
export default OrderConfirmationWrapped;
