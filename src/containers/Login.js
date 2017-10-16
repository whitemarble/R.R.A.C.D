import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import {injectIntl} from 'react-intl';
import {Redirect} from 'react-router-dom';
import rp from 'axios';
import checktoken from '../checktoken';
//import localStorage from 'localStorage';

import './Login.css'

//let localStorage = new Storage(null, { strict: true });
const FormItem = Form.Item;

class Login extends Component {
    state = {
        iconLoading: false,
        response:" ",
        token:false,
        expired:false
    }

    handleSubmit = (e) => {  
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({ iconLoading: true,response:"" });
            rp.post('http://localhost:443/login',{username:values.username,password:values.password})
            .then((result)=>{
                console.log(result.data)
                if(result.data === undefined)
                    this.setState({ 
                        response: "NoResponse",
                        token:false,
                        iconLoading:false
                    });
                else{
                    if(result.data.code === 200){
                        localStorage.setItem('token',result.data.token)
                        //sessionStorage.setItem('token',result.data.token);
                        this.setState({ 
                            response: "Success",
                            token:true,
                            iconLoading:false
                        });
                    }
                        
                    else
                        this.setState({ 
                            response: "Incorrect",
                            token:false,
                            iconLoading:false
                        });
                }
            })
          }
        });
    }

    componentDidMount = async ()=>{
        let result = await checktoken(localStorage.getItem('token'));
        if(result)
            this.setState({token:true})
        else
            this.setState({token:false})
        console.log(this.props.location)
        console.log(this.state)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const intl = this.props.intl;
        const login_username = intl.formatMessage({ id: 'login_username', defaultMessage: 'Username' });
        const login_password = intl.formatMessage({ id: 'login_password', defaultMessage: 'Password' });
        const password_fail = intl.formatMessage({ id: 'password_fail', defaultMessage: 'Please input your username!' });
        const username_fail = intl.formatMessage({ id: 'username_fail', defaultMessage: 'Please input your Password!' });
        const login_button = intl.formatMessage({ id: 'login_button', defaultMessage: 'Login' });
        const login_noresponse = intl.formatMessage({ id: 'login_noresponse', defaultMessage: 'Server no response' });
        const login_incorrect = intl.formatMessage({ id: 'login_incorrect', defaultMessage: 'Incorrect username or password' });
        const login_title = intl.formatMessage({ id: 'login_title', defaultMessage: 'Please Login' });
        const login_title_expired = intl.formatMessage({ id: 'login_title_expired', defaultMessage: 'Please Login (authentication expired)' });

        //设置登陆后跳转页面
        let from = "";
        if(typeof(this.props.location.state)!=="undefined")
            from = this.props.location.state.from
        else from = "/"
        if (this.state.token === true) {
            return (
            <Redirect to={from} />
            )
        }

        const error_message = ()=>{
            //console.log("dddd")
            if(this.state.response === "NoResponse")
                return login_noresponse;
            else if(this.state.response === "Incorrect")
                return login_incorrect;
            else return " ";
        }

        const my_title = ()=>{
            return login_title;
        }

        return (
            <div className="login-wrap">
                <h2 className="login-title">{my_title()}</h2>
                <p className="login-error">{error_message()}</p>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: username_fail }],
                })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder={login_username} />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: password_fail }],
                })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={login_password} />
                )}
                </FormItem>
                <FormItem>
                {/*{getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(
                    <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>*/}
                <Button type="primary" htmlType="submit" className="login-form-button" icon="poweroff" loading={this.state.iconLoading}>
                    {login_button}
                </Button>
                {/*Or <a href="">register now!</a>*/}
                </FormItem>
            </Form>
            </div>
            
        );
    }
}

export default injectIntl(Form.create()(Login));