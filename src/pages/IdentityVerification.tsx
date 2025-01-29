import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout"
import { cn, documentTitle, useUploadDocumentModal } from "../lib/utils";

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


const IdentityVerification = () => {
  documentTitle('Identity Verification');

  const { onOpen } = useUploadDocumentModal();

  const StartVerification = () => {
    return (
      <div className="bg-white rounded px-3 py-4 lg:px-4 lg:py-5 mt-3">
        <div className="w-full lg:w-[61%] h-[170px] lg:h-[200px] flex flex-col justify-between">
          <div className="w-full">
            <h2 className="font-bold font-Inter lg:text-[20px] leading-normal mb-2 text-base">Standard Identity Verification</h2>
            <p className="text-sm font-Inter">It only takes 3-5 minutes to verify your account. Unlock all trading permissions and enjoy access to our full range of products & services</p>
          </div>
          <div>
            <button className="bg-primary hover:bg-secondary font-semibold text-white px-4 py-2 lg:px-6 lg:py-3 rounded-md text-sm lg:text-base" onClick={() =>onOpen()}>Verify Now!</button>
          </div>
        </div>
      </div>
    )
  };

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

  const FaqList = () => {
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

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 lg:w-[580px] w-full">
        <div className="w-full">
          <h2 className="font-DMSans font-bold lg:text-[26px] leading-normal text-[20px]">Verify Your Identity</h2>
          <p className="font-Inter text-sm">This process helps protect your account & allows for seamless trading</p>
        </div>
        <StartVerification/>
        <div className="flex flex-col gap-4 bg-white rounded px-3 py-4 lg:px-4 lg:py-5">
          <h2 className="mb-2 text-[20px] leading-normal font-bold">Frequently Asked Questions</h2>
          <FaqList/>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default IdentityVerification