import React from 'react'
import StepOne from './StepOne';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

  return (
    <div className='mt-5'>
      { currentStep === 0 &&
        <StepOne currentStep={currentStep} setCurrentStep={setCurrentStep} />
      }
    </div>
  )
}

export default MultiStepForm