import React from 'react'
import styled from 'styled-components'

import { palette } from 'utils'
import Paper from 'assets/images/icons/Paper.svg'

import {
  AngleRight,
  AuthImageBlock,
  AuthImg,
  BgAuth,
  BtnWithAngleRight,
  BtnWithAngleRightText,
  InquireArea,
  InquireIcon,
  InquireTitle,
} from '../../styles'

export const ProfessionalAccount: React.FC = (): JSX.Element => {
  return (
    <BgAuth $paddingTop="120px" $paddingBottom="91px">
      <AuthImageBlock $marginBottom="47px">
        <AuthImg />
      </AuthImageBlock>

      <AuthTitle>Заполните анкету, чтобы упростить взаимодействие с сервисом </AuthTitle>

      <ButtonsArea>
        <BtnFill>
          <PaperIcon />

          <BtnFillText>Заполнить</BtnFillText>
        </BtnFill>
        <BtnWithAngleRight $maxWidth="180px">
          <BtnWithAngleRightText>Пропустить</BtnWithAngleRightText>
          <AngleRight />
        </BtnWithAngleRight>
      </ButtonsArea>

      <InquireArea>
        <InquireIcon />
        <InquireTitle>Для чего нужна анкета?</InquireTitle>
      </InquireArea>
    </BgAuth>
  )
}

const AuthTitle = styled.h2`
  font-family: 'Ubuntu';
  font-weight: 700;
  text-align: center;
  color: ${palette.text.primary};
  line-height: 1.2em;
  font-size: 1.25em;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`

const ButtonsArea = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
  margin-bottom: 42px;
`

const BtnFill = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${palette.action.primary};
  width: 100%;
  max-width: 172px;
  border: none;
  border-radius: 8px;
  padding: 13px 24px;
  padding-left: 15px;
  cursor: pointer;
`

const PaperIcon = styled.div`
  background: url(${Paper});
  height: 20px;
  width: 20px;

  background-repeat: no-repeat;
  background-position: center;
  margin-right: 9px;
`

const BtnFillText = styled.p`
  font-family: OpenSans;
  font-weight: 600;
  line-height: 100%;
  color: ${palette.text.inverted};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`
