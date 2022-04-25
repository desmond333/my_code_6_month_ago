import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { palette, validateEmail } from 'utils'
import { getAuthState } from '../../../selectors'
import { passwordRecoveryCheckRequest, passwordRecoveryRequest } from '../../../auth.api'
import { setAuthStatus } from '../../../duck'

import { ButtonTypes, PinCodeInput, SimpleButton } from 'common'
import { AuthButton, AuthImg, BgAuth } from '../../styles'

const TIMER = 120
const FIELDS_NUMBER = 5

interface IProps {
  nextStep: () => void
}

export const StepTwo: React.FC<IProps> = ({ nextStep }): JSX.Element => {
  const [time, setTime] = useState<number>(TIMER)
  const [seconds, setSeconds] = useState<number>(0)
  const [pinCode, setPinCode] = useState('')
  const [validForm, setValidForm] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')

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
        const { data } = await passwordRecoveryCheckRequest({
          session_id: auth.session_id,
          code: pinCode,
        })
        dispatch(setAuthStatus(data))
        nextStep()
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
    const { login } = auth
    const request = async () => {
      try {
        const { data } = validateEmail(login)
          ? await passwordRecoveryRequest({ email: login })
          : await passwordRecoveryRequest({ phone: login })

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
        <PinCodeInput
          onChange={(value: string) => setPinCode(value)}
          fieldNum={FIELDS_NUMBER}
          errorMessage={errorMessage}
        />
        <AuthButton disabled={!validForm} onClick={handleClick} $marginBottom="32px" $height="48px">
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
    </BgAuth>
  )
}

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
    margin-bottom: 20px;
  }
`

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
`

const RetrySendCode = styled.div`
  display: flex;
  margin-bottom: 54px;
`

const TimeoutText = styled.div`
  color: ${palette.text.secondary};
  font-weight: 600;
  margin-left: 8.5px;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`
