import React, { Component } from 'react';
import classes from './SignupForm.module.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import Loader from '../UI/Loader/Loader';

class Signup extends Component {
    state = {
        signupForm : {
            Name: {
                value: ''
            },
            Email: {
                value: ''
            },
            Password: {
                value: ''
            },
        },
        isSignUp: true
    }

    clearInput = () => {
        const updatedForm = {
           ...this.state.signupForm
        }

        Object.entries(Object.entries(updatedForm)).reduce((e, i) => {
            return i[1][1].value = ''
        },[])
        // console.log(updatedForm);
        
        this.setState({signupForm: updatedForm})
    }

    inputValue = (event, inputIdentifier) => {
        const updatedSignupForm = {
            ...this.state.signupForm
        };
        
        
        const updatedFormElement = {
            ...updatedSignupForm[inputIdentifier]
        }

        
        
        updatedFormElement.value = event.target.value;
        updatedSignupForm[inputIdentifier] = updatedFormElement;
        
        this.setState({signupForm: updatedSignupForm})
    }

    formHandler = (event) => {
        event.preventDefault();

        this.props.auth(this.state.signupForm.Name.value, this.state.signupForm.Email.value, this.state.signupForm.Password.value);
        this.clearInput()
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.signupForm) {
            formElementArray.push({
                id: key,
                config: this.state.signupForm[key]
            })
        }

        if(this.props.token) {
            return <Redirect to='/' />
         }

        let form = ( <form onSubmit={this.formHandler}>
            <div className={classes.InputName}>
                <label htmlFor="Name">Your Name</label>
                <input onChange={(event) => this.inputValue(event, formElementArray[0].id)} value={formElementArray[0].config.value} type="text" name='Name' placeholder='John Doe' required />
            </div>

            <div className={classes.InputEmail}>
                <label htmlFor="Email">Your Email</label>
                <input onChange={(event) => this.inputValue(event, formElementArray[1].id)} value={formElementArray[1].config.value} type="email" name='Email' placeholder='name@mail.com' required />
            </div>

            <div className={classes.InputPassword}>
                <label htmlFor="Password">Password</label>
                <input type='password' onChange={(event) => this.inputValue(event, formElementArray[2].id)} value={formElementArray[2].config.value}   placeholder='Your Password' required />
            </div>
            
            <button>SUBMIT</button>
        </form>)
        
        if (this.props.loading) {
            form = <Loader />
        }
        return ( 
            <div className={classes.AuthSection} style={{marginBottom: '70px'}}>
        <div className={classes.SignupForm}>
               {form}
            </div>
            <p><Link to='/login'>Already registered?</Link></p>
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
        auth: (name, email, password) => dispatch(actions.signUp(name, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);