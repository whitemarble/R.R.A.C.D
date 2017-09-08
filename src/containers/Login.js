import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import {Redirect} from 'react-router-dom';
//import bcrypt from 'bcryptjs';

import {loginClicked} from '../actions/LoginAction'
import './Login.css'


const FormItem = Form.Item;

class Login extends Component {
    handleSubmit = (e) => {
        const{loginClick} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            //console.log('Received values of form: ', values);
            //let salt = bcrypt.genSaltSync(10);
            //let hashedPass = bcrypt.hashSync(values.password, salt);
            loginClick(values.username,values.password);
            //console.log('hashedPass: ', hashedPass);
          }
        });
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

        //设置登陆后跳转页面
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (this.props.token !== "") {
            return (
              <Redirect to={ from } />
            )
        }

        const error_message = ()=>{
            if(this.props.message === "NoResponse")
                return login_noresponse;
            else if(this.props.message === "Incorrect")
                return login_incorrect;
            else return "";
        }

        return (
            <div className="login-wrap">
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
                <Button type="primary" htmlType="submit" className="login-form-button" >
                    {login_button}
                </Button>
                {/*Or <a href="">register now!</a>*/}
                </FormItem>
            </Form>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.LoginReducer.token,
        message: state.LoginReducer.message
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loginClick:loginClicked}, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Form.create()(Login)));