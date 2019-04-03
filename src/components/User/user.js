import React, {Component} from 'react'
import './user.css'
import UserDetail from './userDetail'
import IndexLayout from '../Layout/index'
import PropTypes from 'prop-types'

const menu = {
    topselectkeys:'2',
    menuName:'User',
    leftSelectedKeys:'1',
    leftdefaultOpenKeys:'sub1'
}

class UserComponent extends Component{
    static propTypes = {
        data: PropTypes.any,
        onShow: PropTypes.func,
        onSubmit: PropTypes.func
    }
    state={
        menu:menu
    }
    componentDidMount () {

    }
    componentDidUpdate(){

    }
    render(){
        // console.log(this.props)
        // console.log(this.state)
        return(
            <IndexLayout
                data={{...this.state,...this.props}}
            >
                <UserDetail
                data={{...this.state,...this.props}}
                onSubmit={this.props.onSubmit}
                />
                {/*<Layout>*/}
                {/*/!* 头部 *!/*/}
                {/*<HeaderLayout data={{menu:this.state.menu,data:this.props.data.data}}/>*/}
                {/*<Layout>*/}
                {/*/!* 左部 *!/*/}
                {/*<SiderLayout data={this.state}/>*/}
                {/*<Layout style={{ padding: '0 24px 24px' }}>*/}
                {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                {/*<Breadcrumb.Item>Menu</Breadcrumb.Item>*/}
                {/*<Breadcrumb.Item>{this.state.menu.menuName}</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                {/*/!* 内容 *!/*/}
                {/*<Content style={{*/}
                {/*background: '#fff', padding: 24, margin: 0, minHeight: 280,*/}
                {/*}}*/}
                {/*>*/}
                {/*<UserDetail*/}
                {/*data={{...this.state,...this.props}}*/}
                {/*onSubmit={this.props.onSubmit}*/}
                {/*/>*/}
                {/*</Content>*/}

                {/*</Layout>*/}
                {/*</Layout>*/}
                {/*</Layout>*/}
            </IndexLayout>

        )
    }
}

export default UserComponent
