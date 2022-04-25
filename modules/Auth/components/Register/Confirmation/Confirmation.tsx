import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { palette } from 'utils'
import { ButtonTypes, PinCodeInput, SimpleButton } from 'common'
import { setAuthStatus } from '../../../duck'
import { getAuthState } from '../../../selectors'
import {
  addEmailRequest,
  addPhoneRequest,
  checkByEmailRequest,
  checkBySMSRequest,
} from '../../../auth.api'
import { ViaSocialNetworks } from '../../ViaSocialNetworks'

import { AuthButton, AuthImageBlock, AuthImg, BgAuth } from '../../styles'

const TIMER = 120
const FIELDS_NUMBER = 5

export const Confirmation: React.FC = (): JSX.Element => {
  const [time, setTime] = useState<number>(TIMER)
  const [seconds, setSeconds] = useState<number>(0)
  const [pinCode, setPinCode] = useState('')
  const [validForm, setValidForm] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const history = useHistory()
  const dispatch = useDispatch()
  const auth = useSelector(getAuthState)

  useEffect(() => {
    if (time >= 0)
      setTimeout(() => {
        setSeconds(time - Math.floor(time / 60) * 60)
        setTime(time - 1)
      }, 1000)
  }, [time])

  useEffect(() => {
    setErrorMessage(state => (state ? '' : state))
    pinCode.length === FIELDS_NUMBER ? setValidForm(true) : setValidForm(false)
  }, [pinCode.length])

  const handleClick = () => {
    const request = async () => {
      try {
        const data = {
          session_id: auth.session_id,
          code: pinCode,
        }

        const result =
          auth.state === 'REG_EMAIL_CHECK'
            ? await checkByEmailRequest(data)
            : await checkBySMSRequest(data)

        dispatch(setAuthStatus(result.data))
        history.push('/auth/reg/completion')
      } catch (e) {
        setValidForm(false)
        if (e.response.status === 400) {
          setErrorMessage('Вы ввели неверный код! Попробуйте снова')
        }
      }
    }
    request()
  }

  const resendCode = () => {
    const request = async () => {
      try {
        const { data } =
          auth.state === 'REG_EMAIL_CHECK'
            ? await addEmailRequest({ email: auth.login })
            : await addPhoneRequest({ phone: auth.login })

        dispatch(setAuthStatus(data))
      } catch (e) {
        setValidForm(false)
        console.error('Error while sending code')
      }
    }
    request()
  }

  return (
    <BgAuth>
      <AuthImageBlock>
        <AuthImg />
      </AuthImageBlock>

      <Container>
        <AuthTitle>
          На ваш телефон был отправлен <br /> код подтверждения:
        </AuthTitle>

        <PinCodeInput fieldNum={FIELDS_NUMBER} errorMessage={errorMessage} onChange={setPinCode} />

        <AuthButton disabled={!validForm} onClick={handleClick} $marginBottom="33px" $height="48px">
          Подтвердить
        </AuthButton>
      </Container>

      <RetrySendCode>
        <SimpleButton onClick={resendCode} type={ButtonTypes.transparent} disabled={time !== -1}>
          Отправить код повторно
        </SimpleButton>
        <TimeoutText>
          через {seconds === 0 ? Math.ceil(time / 60) : Math.floor(time / 60)}:
          {seconds < 10 ? '0' + seconds : seconds}
        </TimeoutText>
      </RetrySendCode>

      <ViaSocialNetworks title="Или зарегистрируйтесь с помощью:" />
    </BgAuth>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 272px;
`

const AuthTitle = styled.h2`
  font-family: 'Ubuntu';
  font-weight: 700;
  color: ${palette.text.primary};
  line-height: 1.25em;
  font-size: 1em;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 13px;
`

const RetrySendCode = styled.div`
  display: flex;
  margin-bottom: 54px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`

const TimeoutText = styled.div`
  color: ${palette.text.secondary};
  font-weight: 600;
  margin-left: 8.5px;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`
