import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Form, Input, Tooltip, Icon, Button
} from 'antd';
import './register.css'
class Register extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
    }
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (this.props.onSubmit) {
                    this.props.onSubmit({
                        email: values.email,
                        username: values.username,
                        password: values.password,
                        createdTime: +new Date()
                    })
                }
            }
        });
    }
    componentWillMount () {

    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className="register-form">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                min: 6, message: 'Please enter at least six characters',
                            },{
                                max: 20, message: 'Please enter up to twenty characters'
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={(
                            <span>
                            昵称&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                        )}
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

const RegisterComponent = Form.create({ name: 'register' })(Register);

export default RegisterComponent