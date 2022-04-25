export enum authActionTypes {
  SET_AUTH_STATUS = 'app/common/auth/SET_AUTH_STATUS',
  SET_AUTH_LOGIN = 'app/common/auth/SET_AUTH_LOGIN',
}

export interface IAuthState {
  session_id: string
  state: string
  login: string
}

export interface IAuthStatus {
  session_id: string
  state: string
}

export interface ISetAuthStatus {
  type: authActionTypes.SET_AUTH_STATUS
  payload: IAuthStatus
}

export interface ISetAuthLogin {
  type: authActionTypes.SET_AUTH_LOGIN
  payload: string
}

export type Action = ISetAuthStatus | ISetAuthLogin
