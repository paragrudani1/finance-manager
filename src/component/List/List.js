import React, { Component } from 'react';
import classes from './List.module.css'
import {connect} from 'react-redux';
import editBtn from '../../assets/edit/pencil-1.svg';
import Edit from '../Edit/Edit';
import * as actions from '../../store/actions/index'

class List extends Component {
    state = { 
        editState: false,
        editId: null
    }

     getData = (e) => {
        this.setState({editState: !this.state.editState})
        
        let id = e.target.parentElement.id;
         this.props.status.filter(e => {
            if(e.timeStamp === +id) {
                this.setState({editId: e.timeStamp});
            }
        })

     }

     hideEdit = () => {
        this.setState({editState: !this.state.editState})
     }

    render() { 
        return ( 
            <>
            {this.state.editState ? <Edit editId={this.state.editId} hideEdit={this.hideEdit} /> : null}
            <div className={classes.List} id={this.props.id}>
                <div className={classes.List_Amount}>
                    <h1 style={{
                    backgroundColor: this.props.backgroundColor
                }}>${this.props.amount}</h1>
                </div>
                <div className={classes.List_Description}>
                    <p>{this.props.description}</p>
                </div>
                <div className={classes.List_Date}>
                    <h1>{this.props.time}</h1>
                </div>
                <div className={classes.Edit} onClick={this.getData}>
                    <img src={editBtn} alt="Edit" style={{pointerEvents: 'none'}} />
                </div>
            </div>
            </>
         );
    }
}

const mapStateToProps = state => {
    return {
        show: state.dashboard.show,
        status: state.input.status
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addHandler : () => dispatch(actions.addHandler()),
        cancelHandler : () => dispatch(actions.cancelHandler()),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(List);