import React, {Component} from 'react'
import {
    Layout, Breadcrumb
} from 'antd';
import './index.css'
import HeaderLayout from './header'
import SiderLayout from './sider'
import ContentLayout from './content'


class MyLayout extends Component{
    render(){
        return(
            <Layout>
                {/* 头部 */}
                <HeaderLayout data={this.props.data}/>
                <Layout>
                    {/* 左部 */}
                    <SiderLayout data={this.props.data}/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Menu</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.data.menu.menuName}</Breadcrumb.Item>
                        </Breadcrumb>
                        {/* 内容 */}
                        <ContentLayout data={this.props.data}/>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default MyLayout