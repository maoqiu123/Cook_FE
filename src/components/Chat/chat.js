import React from "react";
import {Component} from 'react'
import { Card, Input, Button, Form } from 'antd';

const ws = new WebSocket("wss://echo.websocket.org");
ws.onopen = function(evt) {
    console.log("Connection open ...");
    ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
    console.log( "Received Message: " + evt.data);
    ws.close();
};

ws.onclose = function(evt) {
    console.log("Connection closed.");
};

class ChatLayout extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                ws.send("123")
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card title="毛球的聊天室" bordered={false} style={{ width: 750, margin:"auto" }}>
                    <div  style={{width:"suto", height:300}}>
                        *_* 欢迎进入聊天室 *_*
                        <br />
                        <p style={{wordWrap: "break-word", wordB0reak: "break-all"}}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
                    <Form onSubmit={this.handleSubmit} layout="inline">
                        <Form.Item>
                            {getFieldDecorator('comment', {
                                rules: [{ required: true, message: 'Please input something!' }],
                            })(
                                <Input placeholder="Basic usage" style={{width:550, marginRight:20}}  />
                            )}
                        </Form.Item>
                        <Button type="primary" htmlType="submit" style={{width:100, marginTop:3}}>提交</Button>
                    </Form>
                </Card>

            </div>
        )
    }
}
export default Form.create({ name: 'normal_login' })(ChatLayout);