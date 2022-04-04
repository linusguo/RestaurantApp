
import React from 'react';
import PickUpComponent from './PickUpComponent.jsx';
import DelieverComponent from './DelieverComponent.jsx';

function PaymentMethod(props) {
    if (props.isPick) {
        return <PickUpComponent/>;
    }
    else {
        return <DelieverComponent/>;
    }
  }

class OrderPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isPick: true};
    }

    goPickUp = (e) => {
        this.setState({isPick : true});

    }

    goDeliever = (e) => {
        this.setState({isPick : false});

    }

    render() {
        return (
            <React.Fragment>
                    <button class="btn btn-primary" onClick={this.goPickUp}>
                        PICKUP!
                    </button>
                    <button class="btn btn-primary"  onClick={this.goDeliever}>
                        DELIEVER!
                    </button>

                <PaymentMethod isPick={this.state.isPick}/>
            </React.Fragment>
        )
    }
}

export default OrderPageComponent;
