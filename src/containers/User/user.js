import React,{Component} from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Register from './register'
import Login from './login'
import RegisterReducer from '../../reducers/reducers'
import User from '../../components/User/user'

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

class UserContainer extends Component{
    constructor(){
        super()
        this.state = {
            userData
        }
    }
    render(){
        return (
            <Provider store={store}>
                <User userData={this.state.userData}/>
            </Provider>
        )
    }
}


export {RegisterContainer,LoginContainer,UserContainer}