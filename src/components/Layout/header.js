import React from "react";
import {Component} from 'react'
import {Menu, Avatar, Layout, Dropdown} from "antd";
import {Link} from "react-router-dom";

const { Header } = Layout;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/user">修改头像</Link>
        </Menu.Item>
    </Menu>
);
export default class HeaderLayout extends Component{
    showLogin(){
        return (
            <Menu.Item key="4" className="userAccount"><Link to="/login">登录</Link></Menu.Item>
        )
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

                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    {
                        this.props.data.data?
                            <Menu.Item key="2"><Link to="/user">User</Link></Menu.Item>
                            :null
                    }
                    {
                        this.props.data.data?
                            <Menu.Item key="3" className="userAccount">
                                <Dropdown  overlay={menu} trigger={['click']}>
                                    <Avatar size={60} icon="user" src={this.props.data.data.avatar}/>
                                </Dropdown>
                            </Menu.Item>
                            :this.showLogin()
                    }
                </Menu>
            </Header>
        )
    }
}