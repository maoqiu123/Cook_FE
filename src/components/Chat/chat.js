import React from "react";
import {Component} from 'react'
import { Card, Input, Button, Form } from 'antd';
import md5 from "md5";
import {request} from '../../utils/request'
import uuid from 'uuid'


class ChatLayout extends Component{
    constructor(){
        super()
        var data = null
        var ws = new WebSocket("ws://127.0.0.1:8686/");
        ws.onopen = function(evt) {
            console.log("Connection open ...");
            let chat_id = uuid.v4()
            request('/chat/group/bind/',{
                method:"POST",
                data:{
                    "chat_id":chat_id,
                }
            })
            localStorage.setItem('chat_id',chat_id)
        };

        ws.onmessage = function(evt) {
            data = JSON.parse(evt.data);
            console.log(data);
            let content = document.getElementById("content");
            let child = document.createElement("p");
            if (data.type === 'first'){
                child.innerText = data.data.message;
            }else {
                child.innerText = 'user' + data.data.id + ' : ' + data.data.message;
            }
            content.appendChild(child);
        };

        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };
        window.onbeforeunload=function(){
            try{
                ws.send('quit');
                ws.close();
                ws = null;
                localStorage.removeItem('user' + data.data.id)
                // request('/chat/group/bind/',{
                //     method:"DELETE",
                //     data:{
                //         "chat_id":localStorage.getItem('chat_id'),
                //     }
                // })
            }catch(ex){
                console.log(ex)
            }
        };

        this.state = {
            ws:ws,
        }
    }
    click(){
        console.log(localStorage.getItem('chat_id'))
        request('/chat/group/bind/',{
            method:"DELETE",
            data:{
                "chat_id":localStorage.getItem('chat_id'),
            }
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.state.ws.send(values.comment)
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
                    <div  style={{width:"auto", height:300, overflow:"auto"}} id="content">
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
                        <Button onClick={this.click.bind(this)} style={{width:100, marginTop:3}}>Test</Button>
                    </Form>
                </Card>

            </div>
        )
    }
}
export default Form.create({ name: 'normal_login' })(ChatLayout);