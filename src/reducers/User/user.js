import {request} from '../../utils/request'
function BaseRequest() {
    this.request = request()
}
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
export async function loginRequest (user,request) {
    // BaseRequest.call(this)
    // console.log(user)
    let result = null
    await request("/login",{
        method:"POST",
        data:{
            "password":user.password,
            "email":user.email
        }
    }).then(
        (res) => {
            result = res
        }
    )
    if (result.code === 1000){
        localStorage.setItem("token",result.data)
        window.location.href = "/"
        alert("登录成功，即将跳转主页面")
        return true
    }else {
        let errors = []
        for (let error in result.message){
            errors.push(result.message[error])
        }
        alert(errors.join("\n"))
        // window.location.href = "/login"
        return false;
    }
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
function setCookie(name,value)
{
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}