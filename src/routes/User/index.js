import React, {Component} from 'react'

import MyLayout from "../../components/Layout";

const userData = [
    {
        "key":"sub1",
        "name":"用户资料",
        "type":"user",
        "items":[
            {
                "key":1,
                "name":"详细资料"
            }
        ]
    },
    {
        "key":"sub2",
        "name":"设置",
        "type":"setting",
        "items":[
            {
                "key":2,
                "name":"修改资料"
            },
            {
                "key":3,
                "name":"修改密码"
            },
            {
                "key":4,
                "name":"邮箱换绑"
            },
        ]
    }
];
const menu = {
    topselectkeys:'2',
    menuName:'User',
    leftSelectedKeys:'1',
    leftdefaultOpenKeys:'sub1'
}



const User = ((MyLayout) => {
    class NewLayout extends Component{
        constructor(){
            super()
            this.state = {
                menu,
                userData
            }
        }
        render(){
            return <MyLayout data={this.state}/>
        }
    }
    return NewLayout
})(MyLayout)

export default User