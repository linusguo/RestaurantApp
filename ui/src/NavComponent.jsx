
import React from 'react';

class NavComponent extends React.Component {

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/">Home</a>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">

                            <li class="nav-item active">
                                <a class="nav-link" href="/Login">Login</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="/Register">Register</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavComponent;
