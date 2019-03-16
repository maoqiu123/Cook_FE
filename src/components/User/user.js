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

class UserContainer extends Component{
    static propTypes = {
        onShow: PropTypes.func
    }
    constructor(){
        super()
    }
    componentWillMount () {
        this.props.onShow(localStorage.getItem("token"))
        this.setState({...this.props,menu})
    }
    render(){
        return(
            <Layout>
                {/*{console.log(this.state)}*/}
                {/* 头部 */}
                <HeaderLayout data={this.state}/>
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
const mapStateToProps = (state) => {
    return {
        data: null
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        onShow: (token) => {
            dispatch(showUser(token))
        }
    }
}

export default connect(null,mapDispatchToProps)(UserContainer)
