import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SendEmail from '../Email/SendEmail'
import { Emails } from '../Email/Emails'
import CreateUser from '../User/CreateUser'
import EditUser from '../User/EditUser'
import { Users } from '../User/Users'
import UpdateEmail from '../Email/UpdateEmail'

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