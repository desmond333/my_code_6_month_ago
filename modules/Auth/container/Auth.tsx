import React from 'react'
import { Route, Switch } from 'react-router'

import { Register } from './Register'
import { SignIn } from './SignIn'
import { PasswordRecovery } from '../components'

export const Auth: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/reg" component={Register} />
      <Route path="/auth/password_recovery" component={PasswordRecovery} />
    </Switch>
  )
}
