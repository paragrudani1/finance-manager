import React, { Component } from 'react';
import classes from './LoginForm.module.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Loader from '../UI/Loader/Loader';

class Login extends Component {
    state = {
        loginForm : {
            Email: {
                value: ''
            },
            Password: {
                value: ''
            },
        },
    }

    clearInput = () => {
        const updatedForm = {
           ...this.state.loginForm
        }

        Object.entries(Object.entries(updatedForm)).reduce((e, i) => {
            return i[1][1].value = ''
        },[])
        // console.log(updatedForm);
        
        this.setState({loginForm: updatedForm})
    }

    inputValue = (event, inputIdentifier) => {
        const updatedloginForm = {
            ...this.state.loginForm
        };
        
        
        const updatedFormElement = {
            ...updatedloginForm[inputIdentifier]
        }

        
        
        updatedFormElement.value = event.target.value;
        updatedloginForm[inputIdentifier] = updatedFormElement;
        
        this.setState({loginForm: updatedloginForm})
    }

    formHandler = (event) => {
        event.preventDefault()
        this.props.auth(this.state.loginForm.Email.value, this.state.loginForm.Password.value);
        this.clearInput();
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.loginForm) {
            formElementArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        if(this.props.token) {
            return <Redirect to='/' />
         }

        
        let form = (
            <form onSubmit={this.formHandler}>
                    <div className={classes.InputEmail}>
                        <label htmlFor="Email">Your Email</label>
                        <input onChange={(event) => this.inputValue(event, formElementArray[0].id)} value={formElementArray[0].config.value} type="email" name='Email' placeholder='name@mail.com' required />
                    </div>

                    <div className={classes.InputPassword}>
                        <label htmlFor="Password">Password</label>
                        <input type='password' onChange={(event) => this.inputValue(event, formElementArray[1].id)} value={formElementArray[1].config.value}   placeholder='Your Password' required />
                    </div>
                    
                    <button>SUBMIT</button>
                </form>
        )

        if(this.props.loading) {
            form = <Loader />
        }

        return ( 
            <div className={classes.AuthSection} style={{marginBottom: '70px'}}>
        <div className={classes.LoginForm}>
                {form}
            </div>
            <p><Link to='/signup'>not registered?</Link></p>
        </div>
        )}
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password) => dispatch(actions.Login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);