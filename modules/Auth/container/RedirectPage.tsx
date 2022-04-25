import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { socialNetworkCompleteRequest } from '../auth.api'
import { getUserRequest } from 'core/user/user.api'
import { fetchUser } from 'core/user/duck'

export const RedirectPage: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const request = async () => {
      try {
        const url = history.location.pathname + history.location.search

        const result = await socialNetworkCompleteRequest(url)

        if (result.data.hasOwnProperty('auth_token')) {
          localStorage.setItem('access_token', result.data.auth_token)
          localStorage.setItem('refresh_token', result.data.refresh_token)

          const user = await getUserRequest()
          dispatch(fetchUser(user.data))

          history.push('/auth/reg/account-selection')
        } else {
          console.log('error valid socialNetworkCompleteRequest')
        }
      } catch {
        console.log('error socialNetworkCompleteRequest')
      }
    }

    request()
  }, [history, dispatch])

  return null
}
