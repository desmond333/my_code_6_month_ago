import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { palette, validateEmail } from 'utils'
import { setAuthLogin, setAuthStatus } from '../../../duck'
import { addEmailRequest, addPhoneRequest } from '../../../auth.api'
import { approveMock } from '../../utils'
import { isValidLogin } from '../../../auth.utils'

import { Input, CheckBox } from 'common'
import { ViaSocialNetworks } from '../../ViaSocialNetworks'
import { ICheckBox } from 'common/CheckBox/interface'

import {
  AuthButton,
  AuthImageBlock,
  AuthImg,
  BgAuth,
  InputsArea,
  OtherPageLink,
} from '../../styles'

export const Start: React.FC = (): JSX.Element => {
  const [login, setLogin] = useState<string>('')
  const [confirmAgreement, setConfirmAgreement] = useState<ICheckBox>(approveMock)
  const [validForm, setValidForm] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isValidLogin(login) && confirmAgreement.checked) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [login, confirmAgreement.checked])

  const confirmAgreementHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmAgreement(state => ({
      ...state,
      checked: event.target.checked,
    }))
  }

  const handleClick = () => {
    const request = async () => {
      try {
        const result = validateEmail(login)
          ? await addEmailRequest({ email: login })
          : await addPhoneRequest({ phone: login })

        dispatch(setAuthStatus(result.data))
        dispatch(setAuthLogin(login))
        history.push('/auth/reg/confirmation')
      } catch (e) {
        setValidForm(false)
        if (e.response.status === 400) {
          setErrorMessage('Аккаунт с таким e-mail адресом уже существует')
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

      <AuthTitle>Регистрация</AuthTitle>

      <InputsArea $marginBottom="16px">
        <Input
          title="Телефон или Email"
          value={login}
          errorMessage={errorMessage}
          onChange={value => {
            setLogin(value)
            errorMessage && setErrorMessage('')
          }}
        />
      </InputsArea>

      <AuthButton disabled={!validForm} onClick={handleClick}>
        Продолжить
      </AuthButton>

      <TermsOfUse>
        <CheckBox
          value={confirmAgreement.value}
          label={confirmAgreement.label}
          checked={confirmAgreement.checked}
          onChange={confirmAgreementHandler}
        />
        <TermsOfUseText>
          Нажимая «Продолжить», вы подтверждаете, что <br />
          ознакомлены и полностью согласны с условиями использования сайта.
        </TermsOfUseText>
      </TermsOfUse>

      <OtherPageLink to="/auth/signin">У меня уже есть аккаунт</OtherPageLink>

      <ViaSocialNetworks title="Или зарегистрируйтесь с помощью:" />
    </BgAuth>
  )
}

const AuthTitle = styled.h2`
  font-family: 'Ubuntu';
  font-weight: 700;
  color: ${palette.text.primary};
  line-height: 2.2225em;
  font-size: 1.75em;
  margin-bottom: 7px;

  @media (max-width: 768px) {
    font-size: 1.25em;
  }
`

const TermsOfUse = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 33px;
`

const TermsOfUseText = styled.p`
  color: ${palette.text.primary};
  font-size: 0.875em;
  font-weight: 400;
`
