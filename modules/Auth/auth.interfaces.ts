export interface ILogInData {
  password: string
  phone?: string
  email?: string
}

export interface IAddPhoneData {
  phone: string
}

export interface IAddEmailData {
  email: string
}

export interface ICheckCodeData {
  session_id: string
  code: string
}

export interface IRegistrationData {
  password: string
  first_name: string
  last_name: string
  session_id: string
}

export interface IAccountTypeData {
  account_type: string
}

export interface IPasswordChangeRequestData {
  session_id: string
  password: string
}
