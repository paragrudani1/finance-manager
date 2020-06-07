import React, { Component } from 'react';
import classes from './Backdrop.module.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index'

class Backdrop extends Component {

    componentDidMount() {
        this.props.addHandler()
    }

    render() {
       return this.props.show ? <div onClick={this.props.canceled} className={classes.Backdrop} ></div> : <Redirect to='/' />
}}

const mapStateToProps = state => {
    return {
        show: state.dashboard.show
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addHandler : () => dispatch(actions.addHandler()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);