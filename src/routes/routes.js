import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import {HomeContainer} from '../containers/Home/home'
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
                    <Route exact path="/" component={HomeContainer}/>
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