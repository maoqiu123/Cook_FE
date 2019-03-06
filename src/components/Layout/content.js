import React from "react";
import {Component} from 'react'
import { Layout } from "antd";
const { Content } = Layout;
export default class ContentLayout extends Component{

    render(){
        return(
            <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
                Content
            </Content>
        )
    }
}