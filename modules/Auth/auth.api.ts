import { identAxios } from 'services'

import {
  IAccountTypeData,
  IAddEmailData,
  IAddPhoneData,
  ICheckCodeData,
  ILogInData,
  IPasswordChangeRequestData,
  IRegistrationData,
} from './auth.interfaces'

export const logInRequest = (data: ILogInData) => identAxios.post(`/login`, data)

export const addPhoneRequest = (data: IAddPhoneData) => identAxios.post(`/registration/phone`, data)
export const addEmailRequest = (data: IAddEmailData) => identAxios.post(`/registration/email`, data)

export const checkByEmailRequest = (data: ICheckCodeData) =>
  identAxios.post(`/registration/email/check`, data)

export const checkBySMSRequest = (data: ICheckCodeData) =>
  identAxios.post(`/registration/phone/check`, data)

export const registrationRequest = (data: IRegistrationData) =>
  identAxios.post(`/registration/final`, data)

export const accountTypeRequest = (data: IAccountTypeData) =>
  identAxios.post(`/user/account-type`, data)

export const passwordRecoveryRequest = (data: IAddEmailData | IAddPhoneData) =>
  identAxios.post(`/password-recovery`, data)

export const passwordRecoveryCheckRequest = (data: ICheckCodeData) =>
  identAxios.post(`/password-recovery/check`, data)

export const passwordRecoveryChangeRequest = (data: IPasswordChangeRequestData) =>
  identAxios.post(`/password-recovery/change`, data)

export const redirectLinkRequest = (to: string) => identAxios.post(`/socials/${to}/url/get`)

export const socialNetworkCompleteRequest = (url: string) => identAxios.post(`/socials${url}`)
