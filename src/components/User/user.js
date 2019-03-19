import React, {Component} from 'react'
import {
    Layout, Breadcrumb
} from 'antd';
import './user.css'
import HeaderLayout from '../Layout/header'
import SiderLayout from '../Layout/sider'
import ContentLayout from '../Layout/content'
import {showUser} from "../../reducers/reducers";
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types'

const menu = {
    topselectkeys:'2',
    menuName:'User',
    leftSelectedKeys:'1',
    leftdefaultOpenKeys:'sub1'
}
const userData = [
    {
        "key":"sub1",
        "name":"用户资料",
        "type":"user",
        "items":[
            {
                "key":1,
                "name":"详细资料"
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
                "name":"修改资料"
            },
            {
                "key":3,
                "name":"修改密码"
            },
            {
                "key":4,
                "name":"邮箱换绑"
            },
        ]
    }
];

class UserComponent extends Component{
    static propTypes = {
        data: PropTypes.any,
        onShow: PropTypes.func
    }
    state={
        menu:menu,
        userData:userData
    }
    componentDidMount () {

    }
    componentDidUpdate(){
        // console.log(this.props)
    }
    render(){
        return(
            <Layout>
                {/* 头部 */}
                <HeaderLayout data={{menu:this.state.menu,data:this.props.data.data}}/>
                <Layout>
                    {/* 左部 */}
                    <SiderLayout data={this.state}/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Menu</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.menu.menuName}</Breadcrumb.Item>
                        </Breadcrumb>
                        {/* 内容 */}
                        <ContentLayout data={this.state}/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default UserComponent
