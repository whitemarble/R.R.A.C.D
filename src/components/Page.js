import React, { Component } from 'react';
import {Route,Redirect,withRouter} from 'react-router-dom';
import Login from '../containers/Login';
import Dashboard from './Dashboard';


class Page extends Component {
    hasToken = ()=>{
        let token = localStorage.getItem('token');
        console.log(this.props)
        if(token==="" || token === null || token === undefined)
            return false//<Redirect to={{pathname:"/login",state:{from:this.props.location}} }/>;
        else{
            return true
        } 
        
    }
    
    render() {
        return (
            <div>
                <Route exact path="/" render={ ()=>(this.hasToken()?(<Dashboard />):(<Redirect push to={{pathname:"/login",state: { from: this.props.location }} }/>)) } />
                <Route path="/login" component={Login} />
            </div>
        );
    }
}


  
export default withRouter(Page);