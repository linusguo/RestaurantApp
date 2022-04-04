import React from 'react';
import { Button } from 'react-bootstrap';

class MenuAddItemComponent extends React.Component {
    constructor(props) {
      super();
      this.addClick = this.addClick.bind(this);
      this.createDish = this.createDish.bind(this);
      this.minusClick = this.minusClick.bind(this);
      this.minusDish = this.minusDish.bind(this);
    }

    addClick(e) {
      const newName = this.props.dish.name;
      const newPrice = this.props.dish.price;
      const newQuantity = this.props.dish.quantity;
      const newCategory = this.props.dish.category
      const newDish = {
        name: newName, price: newPrice, quantity: newQuantity, category: newCategory
      }
      this.createDish(newDish);
    }

    minusClick(e) {

      const newName = this.props.dish.name;
      const newPrice = this.props.dish.price;
      const newQuantity = this.props.dish.quantity;
      const newCategory = this.props.dish.category
      const newDish = {
        name: newName, price: newPrice, quantity: newQuantity, category: newCategory
      }

      this.minusDish(newDish);
    }

    async createDish(newDish) {
      this.props.addDish(newDish.name, newDish.price, newDish.category)
    }

    async minusDish(newDish) {
      this.props.minusDish(newDish.name, newDish.price, newDish.category)
    }

    render() {
      return (
        <div>
          <Button name="dishAdd" onClick={this.addClick}>Add</Button>
          <Button name="dishMinus" onClick={this.minusClick}>Minus</Button>
        </div>
      )
    }
  }
  export default MenuAddItemComponent;
