import React, { useState } from 'react'
import { StepOne } from './Steps/StepOne'
import { StepTwo } from './Steps/StepTwo'
import { StepThree } from './Steps/StepThree'

export const PasswordRecovery: React.FC = (): JSX.Element => {
  const [step, setStep] = useState<number>(0)

  const getContent = (): JSX.Element => {
    switch (step) {
      case 1:
        return <StepTwo nextStep={() => setStep(2)} />
      case 2:
        return <StepThree />
      default:
        return <StepOne nextStep={() => setStep(1)} />
    }
  }

  return <>{getContent()}</>
}
