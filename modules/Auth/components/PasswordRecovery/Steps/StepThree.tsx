import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { palette } from 'utils'
import { getAuthState } from '../../../selectors'
import { passwordRecoveryChangeRequest } from '../../../auth.api'

import { InputPassword } from 'common'
import { AuthButton, AuthImg, BgAuth, InputsArea, OtherPageLink } from '../../styles'

export const StepThree: React.FC = (): JSX.Element => {
  const [passwordSetValue, setPasswordSetValue] = useState<string>('')
  const [passwordRepeatValue, setPasswordRepeatValue] = useState<string>('')
  const [validForm, setValidForm] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const history = useHistory()
  const auth = useSelector(getAuthState)

  useEffect(() => {
    if (passwordSetValue && passwordRepeatValue) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [passwordSetValue, passwordRepeatValue])

  const handleClick = () => {
    const sendRequest = async () => {
      try {
        await passwordRecoveryChangeRequest({
          session_id: auth.session_id,
          password: passwordSetValue,
        })
        history.push('/auth/signin')
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

      <AuthTitle>Задайте новый пароль</AuthTitle>

      <InputsArea $marginBottom="12px">
        <InputPassword
          title="Новый пароль *"
          value={passwordSetValue}
          onChange={value => {
            setPasswordSetValue(value)
            errorMessage && setErrorMessage('')
          }}
          errorMessage={errorMessage}
        />
        <InputPassword
          title="Новый пароль ещё раз *"
          value={passwordRepeatValue}
          onChange={value => {
            setPasswordRepeatValue(value)
            errorMessage && setErrorMessage('')
          }}
          errorMessage={errorMessage}
        />
      </InputsArea>

      <AuthButton disabled={!validForm} onClick={handleClick} $marginBottom="40px">
        Сохранить новый пароль
      </AuthButton>

      <OtherPageLink to="/auth/signin">Вернуться к авторизации</OtherPageLink>
    </BgAuth>
  )
}

const AuthTitle = styled.h2`
  font-family: 'Ubuntu';
  font-weight: 700;
  color: ${palette.text.primary};
  line-height: 1.475em;
  font-size: 1.25em;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 22px;
  }
`

const AuthImageBlock = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  margin-bottom: 70px;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    margin-bottom: 25px;
  }
`
