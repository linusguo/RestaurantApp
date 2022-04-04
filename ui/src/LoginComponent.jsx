import React from 'react';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="col-md-6 col-centered"
                    style={{ margin: 'auto' }}>
                    <h2>Login</h2>
                    <input
                        type={'text'}
                        className="form-control"
                        required={true}
                        placeholder="username" />
                    <input
                        type="password"
                        className="form-control"
                        required={true}
                        placeholder="password" />
                    <button
                        className="btn btn-primary btn-block">
                        Login
                    </button>
                </div>
            </div>
        )
    }
}

export default LoginComponent;
