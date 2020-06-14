import React, { Component } from 'react';
import classes from './List.module.css'
import {connect} from 'react-redux';
import editBtn from '../../assets/edit/pencil-1.svg';
import Edit from '../Edit/Edit';
import * as actions from '../../store/actions/index'

class List extends Component {
    state = { 
        editState: false,
        editId: null,
        delete: false
    }


    onDelete = () => {
        this.setState({delete: true})
    }

    onDeleteCancel = () => {
        this.setState({delete: false})
    }

     getData = (target) => {
        this.setState({editState: true})
        
        
        let id = target;
        this.props.status.filter(e => {
            if(e.data.timeStamp === +id) {
                this.setState({editId: e.data.timeStamp});
            }
            return true
        })

     }
    

     hideEdit = () => {
        this.setState({editState: !this.state.editState})
     }

    render() { 

        let attachedClasses = [classes.List, this.state.delete ? classes.remove : null]

        return ( 
            <>
            {this.state.editState ? <Edit onDelete={this.onDelete} onDeleteCancel={this.onDeleteCancel} editId={this.state.editId} hideEdit={this.hideEdit} /> : null}

            <div className={attachedClasses.join(' ')} id={this.props.id} onClick={(e) => this.getData(e.target.id)}>

                <div className={classes.List_Amount} onClick={(e) => this.getData(e.target.parentElement.id)}>
                    <p style={{
                    backgroundColor: this.props.backgroundColor
                }} onClick={(e) => this.getData(e.target.parentElement.parentElement.id)}>₹{this.props.amount}</p>
                </div>
                
                <div className={classes.Parent_Desc} onClick={(e) => this.getData(e.target.parentElement.parentElement.id)}>
                    <div className={classes.List_Description} onClick={(e) => this.getData(e.target.parentElement.parentElement.parentElement.id)}>
                        <p>{this.props.description}</p>
                    </div>

                    <div className={classes.List_Date} onClick={(e) => this.getData(e.target.parentElement.parentElement.parentElement.id)}>
                        <h1>{this.props.time}</h1>
                    </div>
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



 
export default connect(mapStateToProps, null)(List);