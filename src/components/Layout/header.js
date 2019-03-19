import React from "react";
import {Component} from 'react'
import {Menu, Avatar, Layout} from "antd";
import {Link} from "react-router-dom";
const { Header } = Layout;

export default class HeaderLayout extends Component{
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    render(){
        return(
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[this.props.data.menu?this.props.data.menu.topselectkeys:'1']}
                    style={{ lineHeight: '64px' }}
                >
                    {/*{console.log(this.state)}*/}
                    <Menu.Item key="0"><Avatar size={60} icon="user" src={this.props.data.data?this.props.data.data.pic:null}/></Menu.Item>
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/user">User</Link></Menu.Item>
                    <Menu.Item key="3" className="userAccount"><Link to="/register">注册</Link></Menu.Item>
                    <Menu.Item key="4" className="userAccount"><Link to="/login">登录</Link></Menu.Item>
                </Menu>
            </Header>
        )
    }
}