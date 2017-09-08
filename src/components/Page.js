import React, { Component } from 'react';
import {Route,Redirect,withRouter} from 'react-router-dom';
import Login from '../containers/Login';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';



class Page extends Component {
    isLogin = ()=>{
        console.log(this.props.token)
        if(this.props.token==="")
            return <Redirect to={{pathname:"/login",state:{from:this.props.location}} }/>;
        else
            return <Dashboard />;
    }
    
    render() {
        return (
            <div>
                <Route exact path="/" render={ this.isLogin } />
                <Route path="/login" component={Login}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      token: state.LoginReducer.token
    }
  }
  
export default withRouter(connect(
    mapStateToProps
)(Page));