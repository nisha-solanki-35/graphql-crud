import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SendEmail from '../views/Email/SendEmail'
import { Emails } from '../views/Email/Emails'
import CreateUser from '../views/User/CreateUser'
import EditUser from '../views/User/EditUser'
import { Users } from '../views/User/Users'
import UpdateEmail from '../views/Email/UpdateEmail'

const index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Users}></Route>
        <Route exact path='/update-user/:id' component={EditUser}></Route>
        <Route exact path='/create-user' component={CreateUser} />
        <Route exact path='/email-list' component={Emails}></Route>
        <Route exact path='/create-email' component={SendEmail}></Route>
        <Route exact path='/update-email/:id' component={UpdateEmail}></Route>
      </Switch>
    </BrowserRouter>
  )
}

index.propTypes = {

}

export default index