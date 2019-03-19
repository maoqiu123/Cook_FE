import React,{Component} from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import Register from './register'
import Login from './login'
import RegisterReducer, {showUser} from '../../reducers/reducers'
import UserComponent from '../../components/User/user'
import connect from "react-redux/es/connect/connect"
import PropTypes from 'prop-types'
import {request} from '../../utils/request'
import thunk from 'redux-thunk';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),

);
const store = createStore(RegisterReducer, enhancer);
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

class User extends Component{
    static propTypes = {
        data: PropTypes.any,
        onShow: PropTypes.func
    }
    componentDidMount () {
        if (this.props.onShow) {
            this.props.onShow(localStorage.getItem("token"))
        }
    }
    // componentDidUpdate () {
    //     console.log(this.props)
    // }
    render(){
        // console.log(this.state)
        return (
            <div>
                <UserComponent
                    data={this.props.data}
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