import {
  IAuthState,
  Action,
  authActionTypes,
  ISetAuthStatus,
  IAuthStatus,
  ISetAuthLogin,
} from './interfaces'

const initState: IAuthState = {
  session_id: '',
  state: '',
  login: '',
}

export const authReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case authActionTypes.SET_AUTH_STATUS:
      return {
        ...state,
        ...action.payload,
      }

    case authActionTypes.SET_AUTH_LOGIN: {
      return {
        ...state,
        login: action.payload,
      }
    }

    default:
      return state
  }
}

export const setAuthStatus = (data: IAuthStatus): ISetAuthStatus => ({
  type: authActionTypes.SET_AUTH_STATUS,
  payload: data,
})

export const setAuthLogin = (login: string): ISetAuthLogin => ({
  type: authActionTypes.SET_AUTH_LOGIN,
  payload: login,
})
