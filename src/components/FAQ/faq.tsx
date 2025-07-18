import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "What is olamax.io?",
    answer:
      "olamax.io is an autonomous artificial intelligence assistant tool that focuses on helping Human Recruitment, qualify candidates or applicants, and manage the company.",
  },

  {
    question: "How does olamax.io work?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ",
  },
  {
    question: "Is olamax.io right for my company’s HR?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an ",
  },
  {
    question: "What are the cost and fees to use olamax.io?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an",
  },
  {
    question: "How can I set up my account for olamax.io?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an",
  },
];

const categories = [
  "General",
  "Build",
  "Promote",
  "Manage",
  "Integrations",
  "Legal",
];

const Faq = () => {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-[#f5f5f5] text-[#121826] font-sans px-6 py-12">
        <div className="flex max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className=" lg:pr-10   border-r border-[#121826]">
            <ul className="space-y-4 text-[14px] lg:text-[18px] font-medium text-[#121826]">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`px-2 py-1 rounded-md transition-all duration-200 cursor-pointer
                    ${
                      cat === "General"
                        ? "text-[#121826] font-medium"
                        : "text-[#121826]"
                    }
                    hover:bg-[#121826] hover:text-white`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="flex-1 pl-10">
            <h1 className="text-[18px] lg:text-[24px] font-DMSans font-bold mb-2">
              FAQ
            </h1>
            <p className="text-[#121826] text-[14px] lg:text-[18px] font-Inter font-medium mb-10">
              Your questions answered here.
            </p>

            <Accordion type="single" collapsible className="w-full ">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-[#121826]"
                >
                  <AccordionTrigger className="text-left text-[14px] lg:text-[18px] font-Inter font-semibold flex justify-between items-center text-[#121826] [&>svg]:text-[#121826]">
                    {faq.question}
                  </AccordionTrigger>
                  {faq.answer && (
                    <AccordionContent className="text-[12px] lg:text-[16px] font-Inter font-medium text-[#121826]">
                      {faq.answer}
                    </AccordionContent>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq;
