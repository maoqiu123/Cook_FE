import {request} from '../../utils/request'
import {login} from "../reducers";
// function BaseRequest() {
//     this.request = request()
// }
/*
注册
 */
export async function registerRequest(user,request) {
    let result = await request("/register",{
        method:"POST",
        data:{
            "username":user.username,
            "password":user.password,
            "email":user.email
        }
    })
    if (result.code === 1000){
        window.location.href = "/login"
        alert("注册成功，即将跳转至登录页面")
    }else {
        let errors = []
        for (let error in result.message){
            errors.push(result.message[error])
        }
        alert(errors.join("\n"))
    }
}
/*
登录
 */
export async function loginRequest (user) {
    // BaseRequest.call(this)
    // console.log(user)
    await request("/login",{
        method:"POST",
        data:{
            "password":user.password,
            "email":user.email
        }
    }).then(
        (res) => {
            if (res.code === 1000){
                localStorage.setItem("token",res.data)
                alert("登录成功，即将跳转主页面")
                window.location.href = "/"
                return login({load:true})
            }else {
                let errors = []
                for (let error in res.message){
                    errors.push(res.message[error])
                }
                alert(errors.join("\n"))
                window.location.href = "/login"
                return login({load:false})
            }
        }
    )
}

export function checkToken(token) {
    let res = request("/user",{
        method:"GET",
        data:{
            "token":token,
        }
    })
    return res
}

// LoginRequest.prototype = new BaseRequest();
// function setCookie(name,value)
// {
//     let Days = 30;
//     let exp = new Date();
//     exp.setTime(exp.getTime() + Days*24*60*60*1000);
//     document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
// }