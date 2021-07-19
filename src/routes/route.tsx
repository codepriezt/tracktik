import React from "react";
import {  HashRouter as Router, Route, Switch } from "react-router-dom"
import { ProvideAuth } from "../provider/auth/auth-context";
import ScheduleList from "../pages/schedules/list-schedules";
import { hot } from "react-hot-loader/root";
import ScheduleRoute from "./private-route"
import ScheduleEdit from "../pages/schedules/edit-schedule"
import SignIn from "../pages/auth/sign-in"

const Routes = () => {
return(

       <ProvideAuth>
        <Router>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <ScheduleRoute exact path="/schedules" component={ScheduleList} />
                    <ScheduleRoute path="/schedule/:id" component={ScheduleEdit} />
                </Switch>
            </Router>
       </ProvideAuth>
            
        
    ) 
}

export default hot(Routes)
