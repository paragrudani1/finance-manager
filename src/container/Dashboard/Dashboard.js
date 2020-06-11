import React, { Component } from 'react';
import classes from './Dashboard.module.css';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index';
import {Link, withRouter} from 'react-router-dom';
import List from '../../component/List/List'

class Dashbard extends Component {

    

    render() { 

        this.props.status.sort((a,b) => {
            return b.timeStamp - a.timeStamp  
        })
        
        
        
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
            {this.props.status.map((el, i) => {
                // console.log(this.props.updateExpanse(el));
                return <List key={el.timeStamp} id={el.timeStamp} addHandler={this.props.addHandler} amount={el.amount} time={el.updateTime} description={el.description} backgroundColor={el.bgColor} />
            })}
            </>
         );
    }
}

const mapStateToProps = state => {
    return {
        show : state.dashboard.show,
        status: state.input.status,
        totalExpanse: state.input.totalExpanse,
        totalIncome: state.input.totalIncome
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addHandler : () => dispatch(actions.addHandler()),
        cancelHandler : () => dispatch(actions.cancelHandler()) ,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashbard));