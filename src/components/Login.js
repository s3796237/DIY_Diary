import React, { Component } from 'react';
import './styles/Login.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import qs from 'qs';

const MySwal = withReactContent(Swal);

class Login extends Component {
    state = {
        emailLogin: '', 
        passwordLogin: '',
        // hidden: true
    };

    onInputChange = async e => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    }

    // call back function
    onFormSubmit = e => {
        e.preventDefault();

        const { emailLogin, passwordLogin } = this.state;
        
        const apiUrl = "https://panda-diary.herokuapp.com/login";

        const requestBody = {
            email: emailLogin, 
            password: passwordLogin
          }

        axios({
            method: 'POST',
            url: apiUrl,
            data: qs.stringify(requestBody),
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(response => {
            let emailReturn = response.data.returnObj.email;
            let passwordReturn = response.data.returnObj.password;

            // Login Authentication
            if(emailLogin === emailReturn && passwordLogin === passwordReturn) {
                MySwal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Login is successful!',
                    showConfirmButton: false,
                    timer: 1000,
                });
            }else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please make sure that details you\'ve entered are correct!',
                });
            }
        }).catch(error => {
            console.log(error)
        });    
    }


    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        const { emailLogin, passwordLogin, hidden } = this.state;

        return (
            <div className="margin-top">
                <h1 className="login">Sign in</h1>
                <div className="ui container">
                    <div className="ui segment col-md-16">
                        <form onSubmit={this.onFormSubmit} className="ui form">
                            <div className="field">
                                <label id="one" htmlFor="email">Email</label>
                                <div className="input-group input-group-lg">
                                    <span className="input-group-addon">
                                            <i className="fa fa-envelope"></i>
                                    </span> 
                                    <input 
                                        type="email" 
                                        name="emailLogin"
                                        value={emailLogin} 
                                        className="form-control"
                                        size="30"
                                        onChange={this.onInputChange}
                                        placeholder="Email address" required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label id="one" htmlFor="pass">Password</label>
                                <div className="input-group input-group-lg">
                                    <span className="input-group-addon">
                                        <i className="fa fa-lock"></i>
                                    </span> 
                                    <input 
                                        type={hidden ? "password" : "text"} 
                                        value={passwordLogin} 
                                        name="passwordLogin" 
                                        className="form-control"
                                        onChange={this.onInputChange}
                                        placeholder="Password" 
                                        minLength="8"
                                        required
                                    />
                                </div>   
                            </div>
                            <div className="form-check">
                                <input type="checkbox" onClick={this.toggleShow} className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">show password</label>
                            </div>
                            <button className="ui button" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;