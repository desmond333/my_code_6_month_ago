import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { palette } from 'utils'
import { redirectLinkRequest } from '../../auth.api'
import facebookImage from 'assets/images/icons/FacebookBrown.svg'
import googleImage from 'assets/images/icons/GoogleBrown.svg'
import vkImage from 'assets/images/icons/VKBrown.svg'

interface IProps {
  title: string
}

export const ViaSocialNetworks: React.FC<IProps> = ({ title }): JSX.Element => {
  const handleClick = (to: string) => {
    const request = async () => {
      try {
        const result = await redirectLinkRequest(to)
        window.location.href = result.data.url
      } catch {
        console.log('Social login error')
      }
    }

    request()
  }

  return (
    <Bg>
      <ViaSocNetTitle>{title}</ViaSocNetTitle>
      <SocNetRow>
        <FacebookImg onClick={() => handleClick('facebook')} to="#" />
        <GoogleImg onClick={() => handleClick('google')} to="#" />
        <VKImg onClick={() => handleClick('vk')} to="#" />
      </SocNetRow>
    </Bg>
  )
}

const Bg = styled.section`
  width: 100%;
`

const ViaSocNetTitle = styled.h3`
  font-family: 'Ubuntu';
  color: ${palette.text.primary};
  font-weight: 800;
  font-size: 1em;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`

const SocNetRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 25px;
  }
`

const FacebookImg = styled(Link)`
  background-image: url(${facebookImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 24px;
  width: 24px;

  @media (max-width: 768px) {
    height: 20px;
    width: 20px;
  }
`

const GoogleImg = styled(FacebookImg)`
  background-image: url(${googleImage});

  @media (max-width: 768px) {
    height: 19px;
    width: 19px;
  }
`

const VKImg = styled(FacebookImg)`
  background-image: url(${vkImage});
`
