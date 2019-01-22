import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import MyLayout from '../views/index';
import Login from '../views/login/index'
import Cookies from 'js-cookie';

@withRouter
class Routers extends Component {
    constructor(props) {
        super(props)
        this.pathname = this.props.location.pathname;
    }
    checkLogin = () => {   
        if(this.props.location.pathname !== '/login') {
            if (!Cookies.get('_token')) {
                this.props.history.replace('/login');
            }
        } else {
            console.log(Cookies.get('_token'))
            if (Cookies.get('_token')) {
                console.log(111)
                this.props.history.replace('/index');
            }
        }
    }
    componentWillMount () {
        if (this.pathname === '/') {
            if (Cookies.get('_token')) {
                this.props.history.replace('/index');
            } else {
                this.props.history.replace('/login');
            }
        } else {
            this.checkLogin();
        }
    }
    componentWillReceiveProps (){
        this.checkLogin()
    }
    render () {
        return (
            <Switch>
                <Route path="/login" component={Login} exact/>
                <Route path='/index' component={MyLayout}/>
                <Redirect to="/" />
            </Switch>
        )
    }
}

export default Routers
