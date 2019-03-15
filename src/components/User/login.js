import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { Link } from 'react-router-dom'
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: props.load,
            loading : false
        }
    }

    static propTypes = {
        load: PropTypes.any,
        onSubmit: PropTypes.func,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.setState({
                    loading: true
                })
                if (this.state.loading === true){

                } else {
                    if (this.props.onSubmit) {
                        this.props.onSubmit({
                            email: values.email,
                            password: values.password,
                            createdTime: +new Date()
                        })
                        this.props.load.then(
                            (res) => {

                                this.setState({
                                    loading: res.status
                                })
                            }
                        )
                    }
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: 'Please input your email!'
                        },{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your Password!'
                        },{
                            min: 6, message: 'Please enter at least six characters',
                        },{
                            max: 20, message: 'Please enter up to twenty characters'
                        },
                        ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        );
    }
}
const LoginComponent = Form.create({ name: 'normal_login' })(Login);

export default LoginComponent