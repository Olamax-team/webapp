import React from 'react'
import StepOne from './StepOne';
import StepTwo from './StepTwo';

type multiStepProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const MultiStepForm = ({currentStep, setCurrentStep}:multiStepProps) => {

  return (
    <div className='mt-5'>
      { currentStep === 0 && <StepOne currentStep={currentStep} setCurrentStep={setCurrentStep} /> }
      { currentStep === 1 && <StepTwo/> }
    </div>
  )
}

export default MultiStepForm