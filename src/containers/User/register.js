import React,{Component} from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RegisterComponent from '../../components/User/register'
import {request} from "../../utils/request";
import HeaderLayout from "../../components/Layout/header";

const menu = {
    topselectkeys:'3',
}

// CommentInputContainer
// 负责用户名的加载、保存，评论的发布
class RegisterContainer extends Component {
    static propTypes = {
        data: PropTypes.array,
    }
    constructor(){
        super()
        this.state = {
            menu
        }
    }

    handleSubmitComment (user) {
        if (!user) return alert('请输入用户名')
        if (!user.email) return alert('请输入邮箱')
        if (!user.password) return alert('请输入密码')
        if (!user.username) return alert('请输入用户名')
        if (this.props.onSubmit) {
            this.props.onSubmit(user)
        }
    }

    render () {
        return (
            <div>
                <HeaderLayout data={this.state}/>
                <RegisterComponent
                    // user={this.props.user}
                    // onUserNameInputBlur={this._saveUsername.bind(this)}
                    onSubmit={this.handleSubmitComment.bind(this)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: {...state.user}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (user) => {
            request("/register",{
                method:"POST",
                data:{
                    "username":user.username,
                    "password":user.password,
                    "email":user.email
                }
            }).then((res)=>{
                if (res.code === 1000){
                    window.location.href = "/login"
                    alert("注册成功，即将跳转至登录页面")
                }else {
                    let errors = []
                    for (let error in res.message){
                        errors.push(res.message[error])
                    }
                    alert(errors.join("\n"))
                }
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer)