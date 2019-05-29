import React, {Component} from 'react'
import {
    Layout, Breadcrumb
} from 'antd';
import HeaderLayout from "../Layout/header";
import SiderLayout from "../Layout/sider";
import ChatLayout from '../Chat/chat'

const { Content } = Layout;
const userData = [];
const menu = {
    topselectkeys:'1',
    menuName:'User',
    // leftSelectedKeys:'1',
    // leftdefaultOpenKeys:'sub1'
}

class Home extends Component{
    constructor(){
        super()
        this.state = {
            menu,
            userData
        }
    }
    render(){
        return (
            <Layout>
                {/* 头部 */}
                <HeaderLayout data={{menu:this.state.menu,data: this.props.data.data}}/>

                <Layout>
                    {/* 左部 */}
                    <SiderLayout data={this.state}/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Menu</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.menu.menuName}</Breadcrumb.Item>
                        </Breadcrumb>
                        {/* 内容 */}
                        <Content style={{
                            background: '#ECECEC', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            <ChatLayout/>
                        </Content>
                    </Layout>
                </Layout>

            </Layout>
        )
    }
}

export default Home