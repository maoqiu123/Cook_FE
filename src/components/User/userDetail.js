import React from "react";
import {Component} from 'react'
import {
    Form, Row, Col, Input, Button, Layout, Upload, Icon, message
} from 'antd';
import {uploadToken} from '../../utils/upload'
import PropTypes from 'prop-types'

const { Content } = Layout;

const formData =[
    {
        'key':'1',
        'label':'用户名',
        'name':'username',
        'placeholder':'UserName',
        'type':'text',
        'required':true
    },
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
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        let token = uploadToken()
        this.setState({
            token:token
        })
        return isJPG && isLt2M;
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < formData.length; i++) {
            children.push(
                <Col span={8} key={formData[i].key} style='block'>
                    <Form.Item label={formData[i].label}>
                        {
                            getFieldDecorator(formData[i].name, {
                                rules: [{
                                    required: formData[i].required,
                                    message: 'Input something!',
                                }],
                            })(
                                <Input type={formData[i].type} placeholder={formData[i].placeholder} />
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
            if (!err){
                let pic = values.pic ? "http://cook.thmaoqiu.cn/" + values.pic.file.response.hash : this.state.imageUrl
                if (this.props.onSubmit){
                    this.props.onSubmit({
                        username: values.username,
                        pic: pic,
                        token: window.localStorage.getItem("token")
                    })
                }
            }
        });

    }

    componentDidUpdate(){
        if (this.props.data.data.data){
            if (!this.state.load){
                this.setState({
                    load:true,
                    imageUrl:this.props.data.data.data.pic
                })
                this.props.form.setFieldsValue({
                    "username":this.props.data.data.data.username
                })
            }
        }
    }

    render(){
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const uploadProps = {
            listType:"picture-card",
            className:"avatar-uploader",
            showUploadList:false,
            action:"http://up-z2.qiniu.com",
            data:{token:this.state.token},
            beforeUpload:this.beforeUpload.bind(this),
            onChange:this.handleChange
        }
        return(
            <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSubmit}
                    encType="multipart/form-data"
                >
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={8} key='3'>
                            <Form.Item label='Avater'>
                                {
                                    this.props.form.getFieldDecorator('pic', {
                                        rules: [{
                                            required: false,
                                            message: 'Input something!',
                                        }],
                                    })(
                                        <Upload {...uploadProps}>
                                            {imageUrl ? <img src={imageUrl} alt="avatar" width={500} /> : uploadButton}
                                        </Upload>
                                    )
                                }
                            </Form.Item>
                        </Col>

                    </Row>
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