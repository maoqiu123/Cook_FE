import React, {Component} from 'react'

import MyLayout from "./Layout";

const Home = ((MyLayout) => {
    class NewLayout extends Component{
        constructor(){
            super()
            this.state = {
                menu:'1',
                menuName:'Home'
            }
        }
        render(){
            return <MyLayout data={this.state}/>
        }
    }
    return NewLayout
})(MyLayout)

export default Home