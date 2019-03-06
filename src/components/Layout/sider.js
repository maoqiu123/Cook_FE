import React from "react";
import {Component} from 'react'
import {Menu, Layout, Icon} from "antd";
const { SubMenu } = Menu;
const { Sider } = Layout;

export default class SiderLayout extends Component{

    render(){
        return(
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[this.props.data.menu.leftSelectedKeys]}
                    defaultOpenKeys={[this.props.data.menu.leftdefaultOpenKeys]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {this.props.data.userData.map((subMenu)=>{
                        return(
                            <SubMenu key={subMenu.key} title={<span><Icon type={subMenu.type} />{subMenu.name}</span>}>
                                {JSON.stringify(subMenu.items) !== "{}" ? subMenu.items.map((item) => {
                                    return (<Menu.Item key={item.key}>{item.name}</Menu.Item>)
                                }) : null}
                            </SubMenu>
                        )
                    })}

                </Menu>
            </Sider>
        )
    }
}