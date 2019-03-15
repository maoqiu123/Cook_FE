import {registerRequest,loginRequest} from './User/user'
import {request} from '../utils/request'

// action types
const REGISTER = 'register'
const LOGIN = 'login'

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