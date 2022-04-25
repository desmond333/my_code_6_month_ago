import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { palette } from 'utils'
import AuthMainImage from 'assets/images/icons/Identification.svg'
import Inquire from 'assets/images/icons/Inquire.png'
import Angle from 'assets/images/icons/Angle.svg'

export const BgAuth = styled.section<{
  $paddingTop?: string
  $paddingBottom?: string
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: 584px;
  border: 1px solid ${palette.border.secondary};
  border-radius: 20px;
  margin: 60px auto;
  padding: 99px;
  padding-top: ${({ $paddingTop }) => $paddingTop || '40px'};
  padding-bottom: ${({ $paddingBottom }) => $paddingBottom || '39px'};

  @media (max-width: 768px) {
    border: none;
    padding: 24px 16px;
    margin: 0 auto;
  }
`

export const AuthImageBlock = styled.div<{
  $marginBottom?: string
}>`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '26px'};

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`

export const AuthImg = styled.div`
  background: url(${AuthMainImage});
  background-size: cover;
  background-repeat: no-repeat;
  height: 140px;
  width: 160px;

  @media (max-width: 768px) {
    width: 80px;
    height: 70px;
  }
`

export const AuthButton = styled.button<{
  $marginBottom?: string
  $height?: string
}>`
  background-color: ${palette.action.primary};
  border-radius: 8px;
  border: none;
  width: 100%;
  height: ${({ $height }) => $height};
  padding: 14.5px 32px;
  color: ${palette.text.inverted};
  font-weight: 500;
  font-size: 1em;
  letter-spacing: 0.4px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '14px'};

  &:disabled {
    background-color: ${palette.action.disable};
  }

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`

export const InputsArea = styled.div<{
  $marginBottom?: string
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '12px'};
`

export const OtherPageLink = styled(Link)<{
  $marginBottom?: string
}>`
  color: ${palette.text.primary};
  font-weight: 600;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '48px'};

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`

export const InquireArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 38px;

  @media (max-width: 768px) {
    margin-bottom: 28px;
  }
`

export const InquireIcon = styled.div`
  background-image: url(${Inquire});
  background-position: center;
  background-size: cover;
  width: 16px;
  height: 16px;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 7px;
  }
`

export const InquireTitle = styled.div`
  font-weight: 600;
  color: ${palette.action.primary};
  line-height: 1em;
  font-size: 1em;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`

export const BtnWithAngleRight = styled.button<{
  $maxWidth?: string
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '187px'};
  border-radius: 8px;
  border: 1px solid ${palette.border.primary};
  padding: 13px 24px;
  padding-right: 15px;
  cursor: pointer;

  @media (max-width: 768px) {
    max-width: 140px;
  }
`

export const BtnWithAngleRightText = styled.p`
  font-family: OpenSans;
  font-weight: 600;
  line-height: 100%;
  color: ${palette.action.primary};
  white-space: nowrap;
  margin-right: 9px;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`

export const AngleRight = styled.div`
  height: 20px;
  width: 20px;
  background: url(${Angle});
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(-90deg);
  align-self: center;

  @media (max-width: 768px) {
    height: 15px;
    width: 15px;
  }
`
