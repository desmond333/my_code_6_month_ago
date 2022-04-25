import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Input } from 'common'
import {
  AuthButton,
  AuthImageBlock,
  AuthImg,
  BgAuth,
  InputsArea,
  OtherPageLink,
} from '../../styles'

import { palette, validateEmail } from 'utils'
import { passwordRecoveryRequest } from '../../../auth.api'
import { setAuthLogin, setAuthStatus } from '../../../duck'
import { isValidLogin } from '../../../auth.utils'

interface IProps {
  nextStep: () => void
}

export const StepOne: React.FC<IProps> = ({ nextStep }): JSX.Element => {
  const [login, setLogin] = useState<string>('')
  const [validForm, setValidForm] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (isValidLogin(login)) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [login])

  const handleClick = () => {
    const request = async () => {
      try {
        const { data } = validateEmail(login)
          ? await passwordRecoveryRequest({ email: login })
          : await passwordRecoveryRequest({ phone: login })

        dispatch(setAuthStatus(data))
        dispatch(setAuthLogin(login))
        nextStep()
      } catch (e) {
        setValidForm(false)
        if (e.response.status === 400) {
          setErrorMessage('Аккаунт с таким e-mail адресом не существует')
        }
      }
    }
    request()
  }

  return (
    <BgAuth>
      <AuthImageBlock>
        <AuthImg />
      </AuthImageBlock>

      <AuthTitle>Восстановление пароля</AuthTitle>

      <InputsArea $marginBottom="12px">
        <Input
          title="Телефон или Email"
          value={login}
          onChange={value => {
            setLogin(value)
            errorMessage && setErrorMessage('')
          }}
          errorMessage={errorMessage}
        />
      </InputsArea>

      <AuthButton $marginBottom="40px" disabled={!validForm} onClick={handleClick}>
        Отправить
      </AuthButton>

      <OtherPageLink to="/auth/signin">Вернуться к авторизации</OtherPageLink>
    </BgAuth>
  )
}

const AuthTitle = styled.h2`
  font-family: 'Ubuntu';
  font-weight: 700;
  color: ${palette.text.primary};
  line-height: 2.2225em;
  font-size: 1.75em;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 1.25em;
  }
`
