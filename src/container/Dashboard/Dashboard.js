import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index';
import {Link, withRouter} from 'react-router-dom';
import List from '../../component/List/List'
import Loader from '../../component/UI/Loader/Loader'

class Dashbard extends Component {

    componentDidMount() {
        if(this.props.token) {
            this.props.updateAmount(this.props.token, this.props.userId)
            this.props.fetchData(this.props.token, this.props.userId);
        }
    }

    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.totalExpanse !== this.props.status
    // }

    render() { 

        this.props.status.sort((a,b) => {
            return b.timeStamp - a.timeStamp  
        })
        
        let list = this.props.status.map((el, i) => {
            return <List key={el.data.timeStamp} id={el.data.timeStamp} addHandler={this.props.addHandler} amount={el.data.amount} time={el.data.updateTime} description={el.data.description} backgroundColor={el.data.bgColor} />
        })

        if(this.props.loading) {
           list = <Loader />
        }

        if(!this.props.token) {
            return <h1 style={{
                textAlign: "center", 
                position: 'fixed', 
                top: "50%", 
                left: '50%', 
                transform: 'translate(-50%, 50%)', 
                color: 'white', 
                fontFamily: 'Josefin Sans', 
                letterSpacing: '1px'
            }}><Link to='/login'>Please login first....</Link></h1>
        }
        
        return ( 
            <>
            <div className={classes.Dashboard}>
                <div className={classes.Income_Expanse_Container}>

                    {/* Total Expanse  */}
                    <div className={classes.Section_Status}>
                        <h1>Total Expanse - </h1>
                        <p className={classes.Red_Amount}>₹{this.props.totalExpanse}</p>
                    </div>

                    {/* Total Income */}
                    <div className={classes.Section_Status}>
                        <h1>Total Income - </h1>
                        <p className={classes.Green_Amount}>₹{this.props.totalIncome}</p>
                    </div>

                </div>

                <div className={classes.Detail} onClick={this.props.addHandler}>
                    <h1><Link to='/add'>Add</Link></h1>
                </div>

                <div className={classes.Today_Date}>
                    <p>{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* List */}
            {list}
            </>
         );
    }
}

const mapStateToProps = state => {
    return {
        show : state.dashboard.show,
        status: state.input.status,
        totalExpanse: state.input.totalExpanse,
        totalIncome: state.input.totalIncome,
        loading : state.input.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addHandler : () => dispatch(actions.addHandler()),
        cancelHandler : () => dispatch(actions.cancelHandler()) ,
        fetchData : (token, userId) => dispatch(actions.fetchData(token, userId)),
        updateAmount : (token, userId) => dispatch(actions.updateTotalAmount(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashbard));