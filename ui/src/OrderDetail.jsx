
import React from 'react';
import graphQLFetch from './GraphQLFetch.js';
import OrderDetailRow from './OrderDetailRow.jsx';
import { Table } from 'react-bootstrap';

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderId: this.props.id, dishes: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      orderById(id: ${this.state.orderId}) {
        dishes
      }
    }`
    const data = await graphQLFetch(query);
    if (data) {
      const dishesString = data.orderById.dishes;
      const dishes = JSON.parse(dishesString);
      this.setState({ dishes: dishes })
    }
    if (this.state.dishes.length === 0) {
      this.loadData();
    }
  }

  render() {
    const orderRows = this.state.dishes.map(dish =>
      <OrderDetailRow key={dish.id} dish={dish} />
    );
    return (
      <Table condensed hover responsive striped>
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-center">Quantity</th>
            <th class="text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderRows}
        </tbody>
      </Table>
    );
  }
}

export default OrderDetail;
