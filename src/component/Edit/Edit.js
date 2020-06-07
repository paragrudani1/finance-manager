import React, { Component } from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import classes from './Edit.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Edit extends Component {

    constructor(props) {
        super(props);
        this.Description = React.createRef(); 
        this.Amount = React.createRef(); 
    }

    componentDidMount() {
        this.props.status.filter(e => {
            if(e.timeStamp === +this.props.editId) {
                this.setState({description: e.description, amount: e.amount})
            }
        })
    }

    state = {
        description: null,
        amount: null,
        disabled: false
    }

    
    // updateValues = () => {
    //     this.props.status.filter(e => {
    //         if(e.timeStamp === +this.props.editId) {
    //             e.amount = 10
    //         }
    //     })
    // }
    
    getValue = (e) => {
        const description = this.Description.current.value;
        const amount = this.Amount.current.value

        description.length > 1 && amount.length > 1 ? this.setState({description: description, amount:amount, disabled: false}) : this.setState({disabled: true})
    }

    render() { 
        return ( 
            <>
            <Backdrop canceled={this.props.hideEdit} />
                <div className={classes.Input_Box} >
                    <div className={classes.Input_Title}>
                        <h1>Edit</h1>
                    </div>
                    
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={classes.Description}>
                            <input type="text" placeholder="Add a brief Description" defaultValue={this.state.description} onChange={this.getValue} ref={this.Description}  required />
                        </div>

                        <div className={classes.General}>
                            <div className={classes.Amount}>
                                <input type="number" placeholder="Add an Amount" defaultValue={this.state.amount} onChange={this.getValue}  ref={this.Amount} required />
                            </div>
                            
                            <div className={classes.FormBtn}>
                                <button disabled={this.state.disabled} onClick={() => this.props.updateEdit(this.props.editId, this.state.description, this.state.amount)}  className={this.state.disabled ? classes.Disabled : classes.Update}>Update</button>
                                <button disabled={this.state.disabled} onClick={() => this.props.updateDelete(this.props.editId)} className={this.state.disabled ? classes.Disabled : classes.Delete}>Delete</button>
                            </div>
                        </div>
                    </form>
                </div>
                </>
         );
    }
}

const mapStateToProps = state => {
    return {
        status: state.input.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateEdit: (timeStamp, description, amount) => dispatch(actions.updateDataOnEdit(timeStamp, description, amount)),
        updateDelete: (dataIndex) => dispatch(actions.updateDataOnDelete(dataIndex))
    }
}
 

 
export default connect(mapStateToProps, mapDispatchToProps)(Edit);