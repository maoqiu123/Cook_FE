import React from "react";
import {Component} from 'react'
import {
    Form, Row, Col, Input, Button, Layout
} from 'antd';
import PropTypes from 'prop-types'

const { Content } = Layout;

const formData =[
    {
        'key':'1',
        'name':'username',
        'placeholder':'UserName',
        'required':true
    }
]

class UserDetailLayout extends Component{
    state = {
        loading: false,
        load:false
    };
    static propTypes = {
        data: PropTypes.any,
        onSubmit: PropTypes.func
    }

    getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];

        for (let i = 0; i < formData.length; i++) {
            children.push(
                <Col span={8} key={formData[i].key} style='block'>
                    <Form.Item label={formData[i].name}>
                        {
                            getFieldDecorator(formData[i].name, {
                                rules: [{
                                    required: formData[i].required,
                                    message: 'Input something!',
                                }],
                            })(
                                <Input placeholder={formData[i].placeholder} />
                            )
                        }
                    </Form.Item>
                </Col>
            );
        }
        return children;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (this.props.onSubmit){
                this.props.onSubmit({
                    username: values.username,
                    token: window.localStorage.getItem("token")
                })
            }
        });

    }

    componentDidUpdate(){
        if (this.props.data.data.data){
            if (!this.state.load){
                this.setState({
                    load:true
                })
                this.props.form.setFieldsValue({
                    "username":this.props.data.data.data.username
                })
            }
        }
    }

    render(){
        return(
            <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSubmit}
                >
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Content>
        )
    }
}

export default Form.create({ name: 'advanced_search' })(UserDetailLayout);