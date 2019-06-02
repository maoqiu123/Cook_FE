import React from "react";
import {Component} from 'react'
import { Card, Input, Button, Form } from 'antd';

var ws = new WebSocket("ws://127.0.0.1:8686/");
ws.onopen = function(evt) {
    console.log("Connection open ...");
    ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
    console.log( "Received Message: " + evt.data);
    let content = document.getElementById("content")
    let child = document.createElement("p")
    content.appendChild(child)
    child.innerText = evt.data
};

ws.onclose = function(evt) {
    console.log("Connection closed.");
};
window.onbeforeunload=function(){
    try{
        ws.send('quit');
        ws.close();
        ws=null;
    }catch(ex){
        console.log(ex)
    }
};

class ChatLayout extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                ws.send(values.comment)
            }
        });
    };
    // componentWillUpdate(){
    //     ws.send('quit')
    //     ws.close()
    // }


    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Card title="毛球的聊天室" bordered={false} style={{ width: 750, margin:"auto" }}>
                    <div  style={{width:"suto", height:300}} id="content">
                        {/*<p>*_* 欢迎进入聊天室 *_*</p>*/}
                        {/*<p style={{wordWrap: "break-word", wordB0reak: "break-all"}}>aaaa</p>*/}
                        {/*<p style={{wordWrap: "break-word", wordB0reak: "break-all"}}>aaaa</p>*/}
                        {/*<p style={{wordWrap: "break-word", wordB0reak: "break-all"}}>aaaa</p>*/}
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