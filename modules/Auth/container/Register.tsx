import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Start,
  Confirmation,
  AccountSelection,
  ProfessionalAccount,
  Completion,
} from '../components/Register'

export const Register: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/auth/reg/confirmation" component={Confirmation} />
      <Route path="/auth/reg/completion" component={Completion} />
      <Route path="/auth/reg/account-selection" component={AccountSelection} />
      <Route path="/auth/reg/professional-account" component={ProfessionalAccount} />
      <Route component={Start} />
    </Switch>
  )
}
