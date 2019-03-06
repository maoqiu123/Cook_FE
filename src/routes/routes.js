import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Home from '../components/home'
import User from "./User";
import HeaderLayout from '../components/Layout/header'
import {RegisterContainer,LoginContainer} from '../containers/User/user'

const Routes = () => (
    <div>
        <Router>
            <div>
                {/*<HeaderLayout/>*/}
                <Route exact path="/" component={Home}/>
                <Route path="/user" component={User}/>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/register" component={RegisterContainer}/>
            </div>
        </Router>
    </div>

)
export default Routes