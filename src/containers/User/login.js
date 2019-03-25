import React,{Component} from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HeaderLayout from '../../components/Layout/header'
import LoginComponent from '../../components/User/login'
import { login } from '../../reducers/reducers'
import {request} from '../../utils/request'

const menu = {
    topselectkeys:'4',
}
// CommentInputContainer
// 负责用户名的加载、保存，评论的发布
class LoginContainer extends Component {
    static propTypes = {
        data: PropTypes.any,
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
                    data={this.props.data}
                    onSubmit={this.handleSubmitComment.bind(this)} />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.data.data)
    return {
        data: state.data.data
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (user) => {
            request("/login",{
                method:"POST",
                data:{
                    "password":user.password,
                    "email":user.email
                }
            }).then(
                (res) => {
                    if (res.code === 1000){
                        localStorage.setItem("token",res.data)
                        window.location.href = "/"
                        alert("登录成功，即将跳转主页面")
                        dispatch(login({load:true}))
                    }else {
                        let errors = []
                        for (let error in res.message){
                            errors.push(res.message[error])
                        }
                        alert(errors.join("\n"))
                        dispatch(login({load:false}))
                    }
                }
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer)