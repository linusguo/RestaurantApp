
import React from 'react';
import UserContext from './UserContext.js';
import { Redirect, withRouter } from 'react-router-dom'
import graphQLFetch from './GraphQLFetch.js';
import { Link }from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function PaymentMethod(props) {
    if (props.method === "creditCard") {
        return (
            <React.Fragment>
            <label for="Address">Address</label>
            <input
                type={'text'}
                name = "Address"
                className="form-control"
                required={true}
                placeholder="Address" />
            <label for="cardNumber">Card Number</label>
            <input
                type={'text'}
                name = "cardNumber"
                className="form-control"
                required={true}
                placeholder="Card Number" />
            <label for="expirationDate">Expiration Date</label>
            <input
                type={'text'}
                name = "expirationDate"
                className="form-control"
                required={true}
                placeholder="Expiration Date" />
            <label for="cvv">CVV</label>
            <input
                type="password"
                name = "cvv"
                className="form-control"
                required={true}
                placeholder="CVV" />
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
  }

class DelieverComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPick : this.props.isPick,
            pay:'creditCard',
            newId: {},
            redirect: false,
        };
    }

    handleSelectChange = (e) =>{
        this.setState({pay : e.target.value});
    }

    handleSubmit = (e) => {
        const userData = this.context;

        var storage=window.localStorage;
        var localBag = JSON.parse(storage.getItem('shoppingBag'));
        var SubOrder = {
            email : userData.email,
            dishes : storage.getItem('shoppingBag'),
            name : this.state.name,
            method : this.state.pay,
        }
        const query = `mutation orderAdd($SubOrder: OrderInputs!) {
            orderAdd(SubOrder: $SubOrder) {
              _id dishes
            }
          }`;

        const data = graphQLFetch(query, { SubOrder });
        var storage=window.localStorage;
        storage.removeItem('shoppingBag');
        this.setState({redirect: true});
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    info = async(e) => {
        const userData = this.context;
        var storage=window.localStorage;
        var localBag = JSON.parse(storage.getItem('shoppingBag'));
        const email = userData.email;
        var SubOrder = {
            email : email,
            dishes : storage.getItem('shoppingBag'),
            name : this.state.name,
            method : this.state.pay,
        }
        const query = `mutation orderAdd($SubOrder: OrderInputs!) {
            orderAdd(SubOrder: $SubOrder) {
              _id dishes created_time email method
            }
          }`;
        const data = await graphQLFetch(query, { SubOrder });
        var storage=window.localStorage;
        storage.removeItem('shoppingBag');
    }

    async loadData() {
        const query = `query {
          orderNumbers
        }`
        const data = await graphQLFetch(query);
        if(data) {
          this.setState({ newId: data.orderNumbers + 2})
        }
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/Confirmation/${this.state.newId}`} />
        }
        return (
            <React.Fragment>
            <div>
            <div className="col-md-6 col-centered" style={{ margin: 'auto' }}>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                <p><br></br></p>
                <label for="name">Name</label>
                <input
                    type={'text'}
                    name = "name"
                    class="form-control"
                    required={true}
                    placeholder="Name" />
                <label for="phone">Phone Number</label>
                <input
                    type={'text'}
                    name = "phone"
                    class="form-control"
                    required={true}
                    placeholder="Phone" />
                <label for="method">Payment Method</label>
                <div>
                    <select class="form-control" name="method" value={this.state.pay} onChange={this.handleSelectChange}>
                        <option value="creditCard"> Pay by Credit Card!</option>
                    </select>
                </div>
                <PaymentMethod method={this.state.pay}/>
                <div align="center">
                    <p><br></br></p>
                    <Link to={`/Confirmation/${this.state.newId}`}>
                        <button class="btn btn-primary" onClick={this.handleSubmit}>SUBMIT</button>
                    </Link>
                    <Link to={`/Menu`}>
                    <Button>BACK</Button>
                    </Link>
                </div>
                </form>
            </div>
        </div>
        </React.Fragment>
        )
    }
}

DelieverComponent.contextType = UserContext;

const DelieverComponentWrapped = withRouter(DelieverComponent);
delete DelieverComponentWrapped.contextType;
export default DelieverComponentWrapped;
