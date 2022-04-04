
import React from 'react';

class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            country: ''
        }
    }

    register = () => {
        let u = this.state.username;
        let f = this.state.firstname;
        let l = this.state.lastname;
        let p = this.state.password;
        fetch(`http://localhost:8080/api/create/person/${u}/${f}/${l}/${p}`, {
            method: 'POST',
            mode: 'cors',
        })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                while (res.personId === null) {

                }
                if (res.personId !== null) {
                    let link = '/profile/' + res.personId
                    this.props.history.push(link)
                }
            })
    }

    render() {
        return (
            <div>
                <div className="col-md-6 col-centered"
                    style={{ margin: 'auto' }}>
                    <h2>Register</h2>
                    <input
                        type={'text'}
                        className="form-control"
                        required={true}
                        value={this.state.username}
                        onChange={(e) => {
                            this.setState({
                                username: e.target.value
                            })
                        }}
                        placeholder="username" />
                    <input
                        type={'text'}
                        className="form-control"
                        required={true}
                        value={this.state.firstname}
                        onChange={(e) => {
                            this.setState({
                                firstname: e.target.value
                            })
                        }}
                        placeholder="firstname" />
                    <input
                        type={'text'}
                        className="form-control"
                        required={true}
                        value={this.state.lastname}
                        onChange={(e) => {
                            this.setState({
                                lastname: e.target.value
                            })
                        }}
                        placeholder="lastname" />

                    <input
                        type="password"
                        className="form-control"
                        required={true}
                        value={this.state.password}
                        onChange={(e) => {
                            this.setState({
                                password: e.target.value
                            })
                        }}
                        placeholder="password" />
                    <button
                        onClick={this.register}
                        className="btn btn-primary btn-block">
                        Register
                    </button>
                </div>
            </div>
        )
    }
}

export default RegistrationComponent;
