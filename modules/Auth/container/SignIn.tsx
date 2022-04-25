import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { palette, validateEmail } from 'utils'
import { isValidLogin } from '../auth.utils'
import { logInRequest } from '../auth.api'
import { ViaSocialNetworks } from '../components/ViaSocialNetworks'
import { getUserRequest } from 'core/user/user.api'
import { fetchUser } from 'core/user/duck'

import { Input, InputPassword } from 'common'
import { AuthButton, BgAuth, InputsArea } from '../components/styles'
import LockImg from 'modules/Auth/assets/images/icons/Lock.svg'

export const SignIn: React.FC = (): JSX.Element => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validForm, setValidForm] = useState<boolean>(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')

  const dispatch = useDispatch()
  const history = useHistory()

  const logIn = () => {
    const request = async () => {
      try {
        const body = validateEmail(login) ? { email: login, password } : { phone: login, password }

        const tokens = await logInRequest(body)

        localStorage.setItem('access_token', tokens.data.auth_token)
        localStorage.setItem('refresh_token', tokens.data.refresh_token)

        const user = await getUserRequest()
        dispatch(fetchUser(user.data))

        history.push('/')
      } catch (e) {
        setValidForm(false)
        if (e.response.status === 400) {
          const errorMessage = e.response.data.error.message
          if (errorMessage === 'user does not exist') {
            setLoginErrorMessage('Аккаунт с таким e-mail адресом не существует')
          } else if (errorMessage === 'password is wrong') {
            setPasswordErrorMessage('Неверный пароль или e-mail')
          }
        }
      }
    }

    request()
  }

  useEffect(() => {
    if (isValidLogin(login) && password.length !== 0) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [login, password])

  return (
    <BgAuth $paddingTop="110px">
      <AuthTitle>Вход</AuthTitle>

      <InputsArea>
        <Input
          title="Телефон или Email"
          value={login}
          onChange={value => {
            setLogin(value)
            loginErrorMessage && setLoginErrorMessage('')
          }}
          errorMessage={loginErrorMessage}
        />
        <InputPassword
          title="Пароль"
          value={password}
          onChange={value => {
            setPassword(value)
            passwordErrorMessage && setPasswordErrorMessage('')
          }}
          errorMessage={passwordErrorMessage}
        />
      </InputsArea>

      <RememberMe>
        <ApprovalInp type="checkbox" />
        <RememberMeText>Запомнить меня</RememberMeText>
      </RememberMe>

      <AuthButton disabled={!validForm} onClick={logIn}>
        Войти
      </AuthButton>

      <ForgotPassword>
        <LockIcon />
        <RecoveryPassword to="/auth/password_recovery">Я не помню пароль</RecoveryPassword>
      </ForgotPassword>

      <OtherPageLink to="/auth/reg">Зарегистрироваться</OtherPageLink>

      <ViaSocialNetworks title="Или воспользуйтесь для входа:" />
    </BgAuth>
  )
}

const AuthTitle = styled.h2`
  font-family: 'Ubuntu';
  font-weight: 700;
  color: ${palette.text.primary};
  line-height: 2.2225em;
  font-size: 1.75em;
  margin-bottom: 13px;

  @media (max-width: 768px) {
    font-size: 1.25em;
  }
`

const RememberMe = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const ApprovalInp = styled.input`
  border-radius: 50%;
  margin-right: 8px;
  width: 20px;
  height: 20px;
`

const RememberMeText = styled.p`
  color: ${palette.text.primary};
  font-size: 0.875em;
  font-weight: 500;
`

const ForgotPassword = styled.div`
  display: flex;
  margin-top: -1px;
  margin-bottom: 65px;

  @media (max-width: 768px) {
    margin-top: 15px;
    margin-bottom: 35px;
  }
`

const LockIcon = styled.div`
  background: url(${LockImg});
  margin-right: 8px;
  width: 20px;
  height: 20px;
`

const RecoveryPassword = styled(Link)`
  color: ${palette.text.primary};
  font-weight: 600;
  line-height: 1.3em;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`

const OtherPageLink = styled(Link)`
  color: ${palette.text.primary};
  font-weight: 600;
  margin-bottom: 103px;

  @media (max-width: 768px) {
    font-size: 0.75em;
    margin-bottom: 45px;
  }
`
