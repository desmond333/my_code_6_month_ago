import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { palette } from 'utils'
import { Input, InputPassword } from 'common'
import { getAuthState } from '../../../selectors'
import { registrationRequest } from '../../../auth.api'
import { getUserRequest } from 'core/user/user.api'
import { fetchUser } from 'core/user/duck'

import { AuthButton, AuthImageBlock, AuthImg, BgAuth, InputsArea } from '../../styles'

export const Completion: React.FC = (): JSX.Element => {
  const [passwordSetValue, setPasswordSetValue] = useState<string>('')
  const [passwordRepeatValue, setPasswordRepeatValue] = useState<string>('')
  const [nameValue, setNameValue] = useState<string>('')
  const [surnameValue, setSurnameValue] = useState<string>('')
  const [validForm, setValidForm] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const history = useHistory()
  const dispatch = useDispatch()
  const auth = useSelector(getAuthState)

  useEffect(() => {
    if (passwordSetValue && passwordRepeatValue && nameValue && surnameValue) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [passwordSetValue, passwordRepeatValue, nameValue, surnameValue])

  const handleClick = () => {
    const sendRequest = async () => {
      try {
        const tokens = await registrationRequest({
          password: passwordSetValue,
          first_name: nameValue,
          last_name: surnameValue,
          session_id: auth.session_id,
        })

        localStorage.setItem('access_token', tokens.data.auth_token)
        localStorage.setItem('refresh_token', tokens.data.refresh_token)

        const user = await getUserRequest()
        dispatch(fetchUser(user.data))

        history.push('/auth/reg/account-selection')
      } catch {
        setValidForm(false)
        console.log('Error at the third step of registration')
      }
    }

    if (passwordSetValue === passwordRepeatValue) sendRequest()
    else {
      setErrorMessage('Пароли не совпадают')
      setValidForm(false)
    }
  }

  return (
    <BgAuth>
      <AuthImageBlock>
        <AuthImg />
      </AuthImageBlock>

      <AuthTitle>Завершение регистрации</AuthTitle>

      <InputsArea $marginBottom="20px">
        <InputPassword
          title="Задайте пароль *"
          value={passwordSetValue}
          onChange={value => {
            setPasswordSetValue(value)
            errorMessage && setErrorMessage('')
          }}
          errorMessage={errorMessage}
        />

        <InputPassword
          title="Повторите пароль *"
          value={passwordRepeatValue}
          onChange={value => {
            setPasswordRepeatValue(value)
            errorMessage && setErrorMessage('')
          }}
          errorMessage={errorMessage}
        />

        <Input title="Ваше имя" value={nameValue} onChange={setNameValue} />
        <Input title="Ваша фамилия" value={surnameValue} onChange={setSurnameValue} />
      </InputsArea>

      <AuthButton disabled={!validForm} onClick={handleClick} $marginBottom="40px">
        Завершить
      </AuthButton>
    </BgAuth>
  )
}

const AuthTitle = styled.h2`
  font-family: 'Ubuntu';
  font-weight: 700;
  color: ${palette.text.primary};
  line-height: 1.475em;
  font-size: 1.25em;
  margin-bottom: 29px;
  margin-top: 10px;
`
