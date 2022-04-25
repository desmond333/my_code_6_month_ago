import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import angleImage from 'assets/images/icons/Angle.svg'
import {
  AngleRight,
  AuthImageBlock,
  AuthImg,
  BtnWithAngleRight,
  BtnWithAngleRightText,
  InquireArea,
  InquireIcon,
  InquireTitle,
} from '../../styles'

import { palette } from 'utils'
import { useWindowDimensions } from 'utils'

const MIN_WIDTH = 768

export const AccountSelection: React.FC = (): JSX.Element => {
  const { width } = useWindowDimensions()
  const isSmall = width <= MIN_WIDTH

  const [isStAccTextOpen, setIsStAccTextOpen] = useState<boolean>(false)
  const [isPrAccTextOpen, setIsPrAccTextOpen] = useState<boolean>(false)
  const history = useHistory()

  useEffect(() => {
    if (isSmall) {
      setIsStAccTextOpen(false)
      setIsPrAccTextOpen(false)
    } else {
      setIsStAccTextOpen(true)
      setIsPrAccTextOpen(true)
    }
  }, [isSmall])

  return (
    <BgAuth>
      <AuthImageBlock $marginBottom="10px">
        <AuthImg />
      </AuthImageBlock>

      <AuthTitle>Регистрация прошла успешно!</AuthTitle>

      <AccountsArea>
        <BgAccount>
          <TitleArea onClick={() => isSmall && setIsStAccTextOpen(!isStAccTextOpen)}>
            <AccountTitle>Стандартный аккаунт</AccountTitle>

            {isSmall && (isStAccTextOpen ? <AngleUp /> : <AngleDown />)}
          </TitleArea>

          {isStAccTextOpen && (
            <AccountText>
              Ea id do culpa labore enim Lorem dolore. Excepteur non nostrud cupidatat velit cillum
              nostrud ipsum reprehenderit duis.
            </AccountText>
          )}

          <InquireArea>
            <InquireIcon />
            <InquireTitle>Возможности аккаунта</InquireTitle>
          </InquireArea>

          <BtnWithAngleRight>
            <BtnWithAngleRightText onClick={() => history.push('/account/settings')}>
              Продолжить
            </BtnWithAngleRightText>
            <AngleRight />
          </BtnWithAngleRight>
        </BgAccount>

        <BgAccount>
          <TitleArea onClick={() => isSmall && setIsPrAccTextOpen(!isPrAccTextOpen)}>
            <AccountTitle>Профессиональный аккаунт</AccountTitle>

            {isSmall && (isPrAccTextOpen ? <AngleUp /> : <AngleDown />)}
          </TitleArea>

          {isPrAccTextOpen && (
            <AccountText>
              Ea id do culpa labore enim Lorem dolore. Excepteur non nostrud cupidatat velit cillum
              nostrud ipsum reprehenderit duis.
            </AccountText>
          )}

          <InquireArea>
            <InquireIcon />
            <InquireTitle>Возможности аккаунта</InquireTitle>
          </InquireArea>

          <BtnWithAngleRight onClick={() => {}}>
            <BtnWithAngleRightText>Продолжить</BtnWithAngleRightText>
            <AngleRight />
          </BtnWithAngleRight>
        </BgAccount>
      </AccountsArea>
    </BgAuth>
  )
}

const BgAuth = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: 984px;
  border: 1px solid ${palette.border.secondary};
  border-radius: 20px;
  margin: 60px auto;
  padding: 99px;
  padding-top: 52px;
  padding-bottom: 51px;

  @media (max-width: 768px) {
    border: none;
    padding: 24px 16px;
    padding-top: 10px;
    margin: 0 auto;
  }
`

const AuthTitle = styled.h2`
  font-family: 'Ubuntu';
  font-weight: 700;
  color: ${palette.text.primary};
  line-height: 2.2225em;
  font-size: 1.75em;
  margin-bottom: 27px;

  @media (max-width: 768px) {
    font-size: 1.25em;
    line-height: 1.4em;
    text-align: center;
  }
`

const AccountsArea = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
  }
`

const BgAccount = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 384px;
  background-color: ${palette.bg.secondary};
  border-radius: 16px;
  padding: 40px;
  padding-top: 37px;

  @media (max-width: 768px) {
    padding: 16px;
    min-width: 290px;
  }
`

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;

  @media (max-width: 768px) {
    cursor: pointer;
  }
`

const AccountTitle = styled.h3`
  font-family: 'Ubuntu';
  font-weight: 700;
  color: ${palette.text.primary};
  line-height: 1.475em;
  font-size: 1.25em;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`

const AngleDown = styled.div`
  background: url(${angleImage});
  height: 20px;
  width: 20px;
  background-repeat: no-repeat;
  background-position: center;
  align-self: center;
`

const AngleUp = styled(AngleDown)`
  transform: rotate(180deg);
`

const AccountText = styled.p`
  font-weight: 400;
  color: ${palette.text.primary};
  line-height: 1.45em;
  font-size: 0.875em;
  margin-bottom: 25px;
`
