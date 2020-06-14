import React, { Component } from 'react';
import classes from './InputContainer.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import {Redirect} from 'react-router-dom';
import Backdrop from '../UI/Backdrop/Backdrop'
import Loader from '../UI/Loader/Loader'

class InputContainer extends Component {

    constructor(props) {
        super(props);
        this.Description = React.createRef(); 
        this.Amount = React.createRef(); 
    }

    // componentDidMount() {
    //     this.props.addHandler()
    // }

    state = {
        description: null,
        amount: null,
        disabled: true
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    // }

    getValue = (e) => {
        const description = this.Description.current.value;
        const amount = this.Amount.current.value

        description.length > 1 && amount.length > 1 ? this.setState({description: description, amount:amount, disabled: false}) : this.setState({disabled: true})

    };
    

    render() {
        
        let form = (
            <>
        <div className={classes.Input_Title}>
            <h1>Add Details</h1>
        </div>
        
        <form onSubmit={(e) => {e.preventDefault()}}>
            <div className={classes.Description}>
                <input type="text" placeholder="Add a brief Description"  ref={this.Description} onChange={this.getValue} required />
            </div>

            <div className={classes.General}>
                <div className={classes.Amount}>
                    <input type="number" placeholder="Add an Amount" onChange={this.getValue} ref={this.Amount} required />
                </div>
                
                <div className={classes.FormBtn}>
                    <button disabled={this.state.disabled} onClick={() => this.props.storeExpanseDetail(this.state.description, this.state.amount, 'red',this.props.userId, this.props.token)} className={this.state.disabled ? classes.Disabled : classes.ExpanseBtn}>Expanse</button>
                    <button disabled={this.state.disabled} onClick={() => this.props.storeIncomeDetail(this.state.description, this.state.amount, 'green',this.props.userId, this.props.token)} className={this.state.disabled ? classes.Disabled : classes.IncomeBtn}>Income</button>
                </div>
            </div>
        </form>
        </>)

        if(this.props.loading) {
            form = <Loader />
        }
        return ( 
            <>
            <Backdrop canceled={this.props.cancelHandler} />
                <div className={classes.Input_Box} 
                 style={{
                     width: this.props.show ? '43%' : '0%',
                     height: this.props.show ? '380px' : '0px',
                     opacity: this.props.show ? '1' : '0'
                 }}
                 >
                    {form}
                </div>
                </>
         );
    }
}

const mapStateToProps = state => {
    return {
        show: state.dashboard.show,
        status: state.input.status,
        loading: state.input.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

 
const mapDispatchToProps = dispatch => {
    return {
        
        cancelHandler : () => dispatch(actions.cancelHandler()),
        addHandler : () => dispatch(actions.addHandler()),
        storeExpanseDetail : (description, amount, color, id, token) => dispatch(actions.storeTotalExpanse(description, amount, color, id, token)),
        storeIncomeDetail : (description, amount, color,id, token) => dispatch(actions.storeTotalIncome(description, amount, color, id, token)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);