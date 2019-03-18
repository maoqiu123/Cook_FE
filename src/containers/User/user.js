import React,{Component} from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Register from './register'
import Login from './login'
import RegisterReducer, {showUser} from '../../reducers/reducers'
import UserComponent from '../../components/User/user'
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types'
import {request} from '../../utils/request'

const store = createStore(RegisterReducer);

class RegisterContainer extends Component{

    render(){
        return(
            <Provider store={store}>
                <Register />
            </Provider>
        )
    }
}

class LoginContainer extends Component{
    render(){
        return(
            <Provider store={store}>
                <Login />
            </Provider>
        )
    }
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

class User extends Component{
    static propTypes = {
        data: PropTypes.any,
        onShow: PropTypes.func
    }
    constructor(){
        super()
        this.state = {
            userData
        }
    }
    componentDidMount () {
        if (this.props.onShow) {
            this.props.onShow(localStorage.getItem("token"))
        }
    }
    componentDidUpdate () {

    }
    render(){
        console.log(this.props.data)
        return (
            <div>
                <UserComponent
                    userData={this.state.userData}
                    data={this.state.data}
                />
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onShow: (token) => {
            request("/user",{
                method:"GET",
                data:{
                    "token":token,
                }
            }).then(
                (res) => {
                    dispatch(showUser(res))
                }
            )
        }
    }
}
const User2 = connect(mapStateToProps,mapDispatchToProps)(User)

class UserContainer extends Component{
    render(){
        return(
            <Provider store={store}>
                <User2 />
            </Provider>
        )
    }
}

export {RegisterContainer,LoginContainer,UserContainer}