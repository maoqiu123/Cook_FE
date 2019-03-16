import {registerRequest,loginRequest,checkToken} from './User/user'
import {request} from '../utils/request'

// action types
const REGISTER = 'register'
const LOGIN = 'login'
const USER = 'user'

// reducer
export default async function (state, action) {
    if (!state) {
        state = {}
    }
    switch (action.type) {
        case REGISTER:
            registerRequest(action.user,request)
            return { user: action.user }
        case LOGIN:
            let status = true
            await loginRequest(action.user,request).then(
                (res) => {
                    status = res
                }
            )
            return { status: status }
        case USER:
            let d = checkToken(action.data)
            console.log(d)
            return {action}
        default:
            return state
    }
}

// action creators
export const  register = (user) => {
    return { type: REGISTER, user }
}

export const login = (user) => {
    return { type: LOGIN, user }
}

export const showUser = (data) => {
    return { type: USER, data }
}
