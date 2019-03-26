import React, {Component} from 'react'
import {
    Layout, Breadcrumb
} from 'antd';
import './index.css'
import HeaderLayout from './header'
import SiderLayout from './sider'

const { Content } = Layout;

const userData = [
    {
        "key":"sub1",
        "name":"用户资料",
        "type":"user",
        "items":[
            {
                "key":1,
                "name":"详细资料",
                "action":"/user"
            }
        ]
    },
    {
        "key":"sub2",
        "name":"设置",
        "type":"setting",
        "items":[
            {
                "key":2,
                "name":"修改密码",
                "action":"/"
            },
            {
                "key":3,
                "name":"邮箱换绑",
                "action":"/"
            },
        ]
    }
];

class MyLayout extends Component{
    constructor(){
        super()
        this.state = {
            userData: userData
        }
    }
    render(){
        // console.log(this.props)
        // console.log(this.state)
        // console.log({...this.state,...this.props.data})
        return(
            <Layout>
                {/* 头部 */}
                <HeaderLayout data={{menu:this.props.data.menu,data:this.props.data.data.data}}/>
                <Layout>
                    {/* 左部 */}
                    <SiderLayout data={{...this.state,...this.props.data}}/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Menu</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.data.menu.menuName}</Breadcrumb.Item>
                        </Breadcrumb>
                        {/* 内容 */}
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default MyLayout