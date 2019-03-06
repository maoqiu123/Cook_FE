import React,{Component} from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Register from './register'
import Login from './login'
import RegisterReducer from '../../reducers/reducers'


const store = createStore(RegisterReducer)

class UserContainer extends Component{
    render(){
        return(
            <div>

            </div>
        )
    }
}

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

export {RegisterContainer,LoginContainer}