
import React from 'react';
import { Link } from 'react-router-dom';
import graphQLFetch from './GraphQLFetch.js';
import {Button} from 'react-bootstrap';

class PastOrderRow extends React.Component {
  constructor(props) {
    super(props);
    const time = this.props.order.created_time.toDateString();
    const dishes = this.props.order.dishes;
    const dishesObjects = JSON.parse(dishes);
    this.state = {orderId: this.props.id, order:this.props.order, date: time, dishes: dishesObjects }
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
    const order = this.state.order;
    const id = this.state.orderId;
    const date = this.state.date;
    const dishes = this.state.dishes
    const price = this.calculateTotalPrice(dishes);
    return (
      <tr>
        <td align="center">{id}</td>
        <td align="center">{date}</td>
        <td align="center">${price}</td>
        <td>
          <Link to={"/PastOrder/" + id }>
            <Button>Details</Button>
          </Link>
        </td>
      </tr>
    );
  }
}

export default PastOrderRow;
