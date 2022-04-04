
import React from 'react';

class ShoppingBagItemComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          dish : props.dish
      }
    }

    render() {
      return (
        <tr>
        <td>{this.state.dish.id}</td>
        <td>{this.state.dish.name}</td>
        <td>{this.state.dish.quantity}</td>
        <td>{this.state.dish.price}</td>
      </tr>
      )
    }
  }

  export default ShoppingBagItemComponent;
