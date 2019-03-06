import React from "react";
import {Component} from 'react'
import {Menu, Avatar, Layout} from "antd";
import {Link} from "react-router-dom";
const { Header } = Layout;

export default class HeaderLayout extends Component{
    constructor(){
        super()
    }
    componentWillUnmount(){
        this.setState({
            defaultSelectedKeys:this.props.data?this.props.data.menu.topselectkeys:'1'
        })
    }
    async handelKeyOnChange(e){
        await this.setState({
            defaultSelectedKeys: e.key
        })

    }
    render(){
        return(
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[this.props.data?this.props.data.menu.topselectkeys:'1']}
                    style={{ lineHeight: '64px' }}
                >
                    {console.log(this.props)}
                    <Menu.Item key="0"><Avatar size={60} icon="user" src="http://cook.thmaoqiu.cn/t0187be42653c2bc049.jpg" /></Menu.Item>
                    <Menu.Item key="1" onClick={this.handelKeyOnChange.bind(this)}><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2" onClick={this.handelKeyOnChange.bind(this)}><Link to="/user">User</Link></Menu.Item>
                    <Menu.Item key="3" className="userAccount" onClick={this.handelKeyOnChange.bind(this)}><Link to="/register">注册</Link></Menu.Item>
                    <Menu.Item key="4" className="userAccount" onClick={this.handelKeyOnChange.bind(this)}><Link to="/login">登录</Link></Menu.Item>
                </Menu>
            </Header>
        )
    }
}