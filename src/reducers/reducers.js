import {registerRequest} from './User/user'
import {request} from '../utils/request'

// action types
const REGISTER = 'register'
const LOGIN = 'login'

// reducer
export default function (state, action) {
    if (!state) {
        state = { comments: [] }
    }
    switch (action.type) {
        case REGISTER:
            registerRequest(action.user,request)
            return { user: action.user }
        case LOGIN:
            // 新增评论
            return {
                comments: [...state.comments, action.comment]
            }
        default:
            return state
    }
}

// action creators
export const register = (user) => {
    return { type: REGISTER, user }
}

export const login = (data) => {
    return { type: LOGIN, data }
}