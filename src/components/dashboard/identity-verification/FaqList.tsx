import React from 'react'
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from '../../../lib/utils';

type questionItem = {
  question: string,
  answer: string
};

type faqItem = {
  faq: questionItem;
  open: boolean;
  toggleItem: () => void;
};

const faqList: questionItem[] = [
  {
    question: 'What is Identity Verification ?',
    answer: "Identity verification is the process of confirming that a person is who they claim to be. It often involves checking personal information like your name, date of birth, address, or other identifying details. This can be done using official documents such as a government-issued ID, passport, or driver's license. Identity verification helps ensure account security and compliance with regulations, protecting users from fraud and unauthorized access."
  },
  {
    question: 'Why do I Need to Complete Identity Verification ?',
    answer: "Identity verification is the process of confirming that a person is who they claim to be. It often involves checking personal information like your name, date of birth, address, or other identifying details. This can be done using official documents such as a government-issued ID, passport, or driver's license. Identity verification helps ensure account security and compliance with regulations, protecting users from fraud and unauthorized access."
  },
  {
    question: 'What Documents are Required ?',
    answer: "Identity verification is the process of confirming that a person is who they claim to be. It often involves checking personal information like your name, date of birth, address, or other identifying details. This can be done using official documents such as a government-issued ID, passport, or driver's license. Identity verification helps ensure account security and compliance with regulations, protecting users from fraud and unauthorized access."
  },
  {
    question: 'What Other Means of Verification are Available ?',
    answer: "Identity verification is the process of confirming that a person is who they claim to be. It often involves checking personal information like your name, date of birth, address, or other identifying details. This can be done using official documents such as a government-issued ID, passport, or driver's license. Identity verification helps ensure account security and compliance with regulations, protecting users from fraud and unauthorized access."
  },
];

const FaqList = () => {

  const FaqItem = ({faq, open, toggleItem}:faqItem) => {
    return (
      <div className={cn("h-[27px] overflow-hidden cursor-pointer transition-all duration-300 font-Inter", open && 'h-auto')} onClick={() => toggleItem()}>
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] leading-normal font-semibold">{faq.question}</h2>
          { open ? <ChevronDown className="size-5"/> : <ChevronUp className="size-5"/> }
        </div>
        <p className="text-sm pr-6 mt-1 text-justify">{faq.answer}</p>
      </div>
    )
  };

  const [currentIndex, setCurrentIndex] = React.useState(-1);

  const toggleAccordionItem = React.useCallback((index: number) => {
    setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  },[]);

  return (
    <React.Fragment>
      { faqList.map((item, index) => (
        <FaqItem
          key={index}
          faq={item}
          open={currentIndex === index}
          toggleItem={() => toggleAccordionItem(index)}
        />
      ))}
    </React.Fragment>
  )
};

export default FaqList