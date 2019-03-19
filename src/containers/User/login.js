import React,{Component} from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HeaderLayout from '../../components/Layout/header'
import LoginComponent from '../../components/User/login'
import { login } from '../../reducers/reducers'

const menu = {
    topselectkeys:'4',
}
// CommentInputContainer
// 负责用户名的加载、保存，评论的发布
class LoginContainer extends Component {
    static propTypes = {
        load: PropTypes.any,
        onSubmit: PropTypes.func
    }
    constructor(){
        super()
        this.state = {
            menu
        }
    }

    async handleSubmitComment (user) {
        if (!user.email) return alert('请输入邮箱')
        if (!user.password) return alert('请输入密码')
        if (this.props.onSubmit) {
            await this.props.onSubmit(user)
        }
    }

    render () {
        return (
            <div>
                <HeaderLayout data={this.state}/>
                <LoginComponent
                    load={this.props.load}
                    onSubmit={this.handleSubmitComment.bind(this)} />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        load: state
    }

}

const mapDispatchToProps = (dispatch) => {
    return {

        onSubmit: async (user) => {
            await dispatch(login(user))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer)