
import React from 'react';
import ShoppingBagItemComponent from './ShoppingBagItemComponent.jsx';
import graphQLFetch from './GraphQLFetch.js';

class ShoppingBagComponent extends React.Component {
    constructor() {
      super();
      this.state = {items : []};// shoppingbag []
    }

    componentDidMount() {
        this.loadData();

    }

    async loadData() {
        const query = `query {
            shoppingBag {
            id name category quantity price image_link description
            }
        }`;
        const data = await graphQLFetch(query);
        if (data) {
            console.log(data.shoppingBag);
            console.log("DATA GOT");
            this.setState({items: data.shoppingBag });
        }
    }

    render() {
        const shoppintItems = this.state.items.map(item =>
            <ShoppingBagItemComponent key = {item.id} dish = {item}/>
        );
        return (
            <table className="bordered-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {shoppintItems}
            </tbody>
            </table>
        )
        }
  }
  export default ShoppingBagComponent;
