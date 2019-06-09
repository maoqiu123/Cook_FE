import axios from "axios";

axios({
    method:"DELETE",
    url:{
        'chat_id':localStorage.getItem('chat_id')
    },
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
    }
    // headers:{
    //             //     'Content-Type': 'application/json',
    //             // }
}).then(res => {
    console.log(res)
    if (res.status === 200){
        return res.data
    }else {
        alert("请求错误，请刷新重试或联系管理员")
        // window.location.href = "/"
    }
}).catch(
    error => {
        alert("请求错误，请刷新重试！")
    }
)