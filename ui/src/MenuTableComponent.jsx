import React from 'react';
import MenuAddItemComponent from './MenuAddItemComponent.jsx'
import graphQLFetch from './GraphQLFetch.js';
import { withRouter } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

function DishTable(props) {
  const dishRows = props.dishes.map(dish =>
    <DishRow
      shoppingBag = {props.shoppingBag}
      key={dish.id}
      dish={dish}
      addDish = {props.addDish}
      minusDish = {props.minusDish}
      reRender = {props.reRender}/>
  );
  return (
    <Table condensed hover responsive striped>
      <thead>
        <tr>
          <th className="text-center">Name</th>
          <th className="text-center">Category</th>
          <th className="text-center">Quantity</th>
          <th className="text-center">Price</th>
          <th className="text-center">Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dishRows}
      </tbody>
    </Table>
  );
}

function DishRow(props) {
  const dish = props.dish;
  const shoppingBag = props.shoppingBag;
  let quantity = 0
  for (var i = 0; i < shoppingBag.length; i++) {
    if (shoppingBag[i].name == dish.name) {
      quantity = shoppingBag[i].quantity
    }
  }

  return (
    <tr>
      <td align="center">{dish.name}</td>
      <td align="center">{dish.category}</td>
      <td align="center">{quantity}</td>
      <td align="center">{dish.price}</td>
      <td align="center">{dish.description}</td>
      <td>
        <MenuAddItemComponent
        reRender = {props.reRender}
        addDish = {props.addDish}
        minusDish = {props.minusDish}
        dish={dish}/>
      </td>
    </tr>
  );
}

class MenuTableComponent extends React.Component {
  constructor() {
    super();
    this.state = { dishes: [], shoppingBag: [], bagSize : 0, price : 0, localBag :[]};

  }

  componentDidMount() {
    this.loadData();
  }

  calcuPrice = () => {
    let price = 0
    let entree = 0
    var storage=window.localStorage;
    var shoppingBag = JSON.parse(storage.getItem('shoppingBag'));
    for (var i = 0; i < shoppingBag.length; i++) {
      price += shoppingBag[i].quantity * shoppingBag[i].price
      entree += shoppingBag[i].quantity
    }
    this.setState({price : price, bagSize : entree});
  }

  addDish = (dishName, dishPrice, dishCategory) => {
    let found = false;
    for (var i = 0; i < this.state.shoppingBag.length; i++) {
      if (this.state.shoppingBag[i].name == dishName) {
        found = true
      }
    }
    if (!found) {
      var newDish = {name : dishName, quantity : 1, price : dishPrice, category : dishCategory}
      this.state.shoppingBag.push(newDish)
    }
    else {
      for (var i = 0; i < this.state.shoppingBag.length; i++) {
        if (this.state.shoppingBag[i].name == dishName) {
          this.state.shoppingBag[i].quantity += 1
        }
      }
    }
    var storage=window.localStorage;
    storage.setItem('shoppingBag',JSON.stringify(this.state.shoppingBag));
    this.setState({shoppingBag : this.state.shoppingBag})
    this.calcuPrice()
  }

  minusDish = (dishName, dishPrice, dishCategory) => {
    let found = false;
    for (var i = 0; i < this.state.shoppingBag.length; i++) {
      if (this.state.shoppingBag[i].name == dishName) {
        found = true
      }
    }
    if (found) {
      for (var i = 0; i < this.state.shoppingBag.length; i++) {
        if (this.state.shoppingBag[i].name == dishName) {
          if (this.state.shoppingBag[i].quantity > 1) {
            this.state.shoppingBag[i].quantity -= 1
          }
          else {
            this.state.shoppingBag.splice(i, 1)
          }

        }
      }
    }
    var storage=window.localStorage;
    storage.setItem('shoppingBag',JSON.stringify(this.state.shoppingBag));
    this.setState({shoppingBag : this.state.shoppingBag})
    this.calcuPrice()
  }


   loadData = async() => {
    const query = `query {
      dishList {
        id name category quantity price image_link description
      },
      shoppingBag {
        id name category quantity price image_link description
      }
    }`;
    const data = await graphQLFetch(query);

    var storage=window.localStorage;
    var localBag = JSON.parse(storage.getItem('shoppingBag'))
    if (!localBag) {
      if (data) {
        console.log("M E N U" + JSON.stringify(data.dishList[0]))
        console.log("Shopping Bag" + JSON.stringify(data.shoppingBag))
        this.setState({ dishes: data.dishList, shoppingBag: [], bagSize : data.shoppingBag.length });
      }
    }
    else {
      this.setState({dishes: data.dishList,shoppingBag : localBag})
    }

    this.calcuPrice()
  }

  submitOrder =()=>{
    this.props.history.push('/OrderSummary')
}

  render() {
    return (
      <React.Fragment>
        <h1>MENU</h1>
        <hr />
        <DishTable
        dishes={this.state.dishes}
        reRender = {this.loadData}
        addDish = {this.addDish}
        minusDish = {this.minusDish}
        shoppingBag = {this.state.shoppingBag}/>
        <div align="center">
          <h3 align="center">You have {this.state.bagSize} items in the bag. Total price is ${this.state.price}</h3>
          <button className="btn btn-primary" id="num" onClick={this.submitOrder} >Confirm contact information and payment</button>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(MenuTableComponent);
