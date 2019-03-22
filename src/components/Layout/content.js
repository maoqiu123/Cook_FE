import React from "react";
import {Component} from 'react'
import {
    Form, Row, Col, Input, Button, Icon, Layout, Upload, message
} from 'antd';

const { Content } = Layout;

const formData =[
    {
        'key':'1',
        'name':'username',
        'placeholder':'UserName',
        'required':true
    },
    {
        'key':'2',
        'name':'email',
        'placeholder':'Emai;',
        'required':true
    }
]

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class ContentLayout extends Component{
    state = {
        loading: false,
        load:false
    };
    // To generate mock Form.Item
    getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];

        for (let i = 0; i < formData.length; i++) {
            children.push(
                <Col span={8} key={formData[i].key} style='block'>
                    <Form.Item label={formData[i].name}>
                        {getFieldDecorator(formData[i].name, {
                            rules: [{
                                required: formData[i].required,
                                message: 'Input something!',
                            }],
                        })(
                            <Input placeholder={formData[i].placeholder} />
                        )}
                    </Form.Item>
                </Col>
            );
        }
        return children;
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }
    componentDidMount(){
        if (!this.state.load){
            this.setState({
                load:true,
                ...this.props
            })
        }
    }


    render(){
        // const uploadButton = (
        //     <div>
        //         <Icon type={this.state.loading ? 'loading' : 'plus'} />
        //         <div className="ant-upload-text">Upload</div>
        //     </div>
        // );
        // const imageUrl = this.state.imageUrl;
        // const { getFieldDecorator } = this.props.form;
        console.log(this.state)
        return(
            <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={24}>{this.getFields()}</Row>
                    {/*<Row>*/}
                        {/*<Col span={8} key={3}>*/}
                            {/*<Form.Item label="Avater">*/}
                                {/*{getFieldDecorator("avatar", {*/}

                                {/*})(*/}
                                    {/*<Upload*/}
                                        {/*name="avatar"*/}
                                        {/*listType="picture-card"*/}
                                        {/*className="avatar-uploader"*/}
                                        {/*showUploadList={false}*/}
                                        {/*action="//jsonplaceholder.typicode.com/posts/"*/}
                                        {/*beforeUpload={beforeUpload}*/}
                                        {/*onChange={this.handleChange}*/}
                                    {/*>*/}
                                        {/*{imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}*/}
                                    {/*</Upload>*/}
                                {/*)}*/}
                            {/*</Form.Item>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                            {/*<Button style={{ marginLeft: 8 }} onClick={this.handleReset}>*/}
                                {/*Clear*/}
                            {/*</Button>*/}
                        </Col>
                    </Row>
                </Form>
            </Content>
        )
    }
}

export default Form.create({ name: 'advanced_search' })(ContentLayout);