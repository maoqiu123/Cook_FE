import React from "react";
import {Component} from 'react'
import {Menu, Layout, Icon} from "antd";
import {Link} from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

export default class SiderLayout extends Component{
    render(){
        return(
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[this.props.data.menu.leftSelectedKeys?this.props.data.menu.leftSelectedKeys:'1']}
                    defaultOpenKeys={[this.props.data.menu.leftdefaultOpenKeys?this.props.data.menu.leftdefaultOpenKeys:'1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {this.props.data.userData.map((subMenu)=>{
                        return(
                            <SubMenu key={subMenu.key} title={<span><Icon type={subMenu.type} />{subMenu.name}</span>}>
                                {JSON.stringify(subMenu.items) !== "{}" ? subMenu.items.map((item) => {
                                    return (<Menu.Item key={item.key}>
                                        <Link to={item.action}>
                                            {item.name}
                                        </Link>
                                    </Menu.Item>)
                                }) : null}
                            </SubMenu>
                        )
                    })}

                </Menu>
            </Sider>
        )
    }
}