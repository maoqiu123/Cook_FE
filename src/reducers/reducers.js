// action types
const REGISTER = 'register'
const LOGIN = 'login'
const USER = 'user'

// reducer
export default function (state={ data:[] }, action) {
    switch (action.type) {
        case REGISTER:
            return { data: action  }
        case LOGIN:
            return { data: action }
        case USER:
            return { ...action }
        default:
            return state
    }
}

// action creators
export const  register = (user) => {
    return { type: REGISTER, user }
}

export const login = (data) => {
    return { type: LOGIN, data }
}

export const showUser = (data) => {
    return { type: USER, data }
}
