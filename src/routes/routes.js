import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Home from '../components/home'
import HeaderLayout from '../components/Layout/header'
import {RegisterContainer,LoginContainer,UserContainer} from '../containers/User/user'

// function  QAQ() {
//     return (
//
//     )
// }

const Routes = () => (
    <div>
        <Router>
            <div>
                {/*<HeaderLayout/>*/}
                <Switch>
                    <Route exact path="/" component={Home}/>
                    {/*<Route path="/qaq" component={QAQ}>*/}
                    <Route path="/user" component={UserContainer}/>
                    <Route path="/login" component={LoginContainer}/>
                    <Route path="/register" component={RegisterContainer}/>
                </Switch>


            </div>
        </Router>
    </div>

)
export default Routes