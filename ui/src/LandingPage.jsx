
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UserContext from './UserContext.js';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const handleGuestClick = () => alert("Please signed in.");
        let button;
        const user = this.context;
        if (!user.signedIn) {
            button = <Button variant="outline-dark" size="lg" style={{fontSize: "27px"}} onClick={handleGuestClick}>
                        Start Order
                    </Button>;
        } else {
            button = <Link to="/Menu">
                        <Button variant="outline-dark" size="lg" style={{fontSize: "27px"}}>
                            Start Order
                        </Button>
                    </Link>;
        }
        return (
            <div style={{
                    backgroundImage: "url(/background.jpg)",
                    height: "100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    position: 'absolute', left: '0px', width: '100%', overflow: 'hidden'
                 }}>
                <div style={{
                    position: 'absolute', left: '50%', top: '30%',
                    transform: 'translate(-50%, -50%)'}}
                >
                    <p style={{fontSize: "100px", color:"white", fontWeight:"bold"}}>Welcome!</p>

                </div>
                <div style={{
                    position: 'absolute', left: '50%', top: '70%',
                    transform: 'translate(-50%, -50%)'}}
                >
                    {button}
                </div>
            </div>
        )
    }
}

LandingPage.contextType = UserContext;

export default LandingPage;
