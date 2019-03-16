import axios from "axios";

export function request(url,options) {
    axios.defaults.baseURL = "http://localhost:80";
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    if (options.method === "GET" || options.method === "DELETE") {
        let data = "?"
        for (let key in options.data){
            data += key+"="+options.data[key]+"&"
        }
        return axios({
            method:"GET",
            url:url+data,
            // headers:{
            //             //     'Content-Type': 'application/json',
            //             // }
        }).then(res => {
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
    }else if (options.method === "POST" || options.method === "PUT"){
        return axios({
            url:url,
            // headers:{
            //     'Content-Type': 'application/json',
            // },
            ...options
        }).then(res => {
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
    }else {
        console.log("HTTP ERROR")
        return "HTTP ERROR"
    }

}
