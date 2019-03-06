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
export async function LoginRequest(user,request) {
    let result = await request("/login",{
        method:"POST",
        data:{
            "password":user.password,
            "email":user.email
        }
    })
    if (result.code === 1000){
        window.location.href = "/"
        alert("注册成功，即将跳转主页面")
    }else {
        let errors = []
        for (let error in result.message){
            errors.push(result.message[error])
        }
        alert(errors.join("\n"))
    }
}