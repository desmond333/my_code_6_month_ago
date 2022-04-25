import { validateEmail, validatePhone } from '../../utils'

const VALID_PHONE_SYMBOL_LENGTH = 11
const VALID_PHONE_LENGTH = 12

export const isValidLogin = (login: string) => {
  let isValid: boolean = true

  if (login.length === 0) {
    isValid = false
  } else {
    if (!validateEmail(login)) {
      isValid = false
    }

    if (validatePhone(login)) {
      const length = login.length
      isValid =
        length === VALID_PHONE_LENGTH || (length === VALID_PHONE_SYMBOL_LENGTH && login[0] !== '+')
    }
  }

  return isValid
}
