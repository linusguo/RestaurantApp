
import React from 'react';

class OrderDetailRow extends React.Component {

  render() {
    const dish = this.props.dish;
    return (
      <tr>
        <td align="center">{dish.name}</td>
        <td align="center">{dish.quantity}</td>
        <td align="center">${dish.price}</td>
      </tr>
    );
  }
}

export default OrderDetailRow;
