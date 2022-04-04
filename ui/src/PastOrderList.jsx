import React from 'react';
import PastOrderRow from './PastOrderRow.jsx';
import { Table } from 'react-bootstrap';

class PastOrderList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const PastOrderRows = this.props.pastOrders.map(order =>
        <PastOrderRow key={order.id} id={order.id} order={order} />
    );
    return (
      <Table condensed hover responsive striped>
        <thead>
          <tr>
          <th class="text-center">Order Number</th>
          <th class="text-center">Order Date</th>
          <th class="text-center">Total Price</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {PastOrderRows}
        </tbody>
      </Table>
    );
  }
}

export default PastOrderList;
