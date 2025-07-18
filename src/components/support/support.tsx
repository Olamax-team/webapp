import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import Contact from "./contact-Us";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Support = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const helpCat = [
    {
      icon: "/images/Launching.svg",
      label: "Getting Started",
      description: "All you need to know about OLAMAX EXCHANGE.",
      article: "3 Articles",
      path: "/support",
    },
    {
      icon: "/images/CryptoPortfolio.svg",
      label: "Trading Crypto",
      description: "How to make your first trade.",
      article: "2 Articles",
      path: "/support",
    },
    {
      icon: "/images/PrivacyPolicy1.svg",
      label: "Privacy & Security",
      description: "Keep your account secure.",
      article: "10 Articles",
      path: "/support",
    },
    {
      icon: "/images/IDCard.svg",
      label: "KYC",
      description: "Know your customer (KYC) verification steps.",
      article: "4 Articles",
      path: "/support",
    },
    {
      icon: "/images/PrivacyPolicy2.svg",
      label: "Our Policies",
      description: "OLAMAX EXCHANGE compliance & policies.",
      article: "15 Articles",
      path: "/support",
    },
    {
      icon: "/images/MyPassword.svg",
      label: "Manage my Account",
      description: "Manage your personal preferences.",
      article: "6 Articles",
      path: "/support",
    },
    {
      icon: "/images/Referral.svg",
      label: "Referral Program",
      description: "Gifts, benefits & promos",
      article: "4 Articles",
      path: "/support",
    },
    {
      icon: "/images/GroupTherapy.svg",
      label: "Other Topics",
      description: "Find out more about OLAMAX EXCHANGE.",
      article: "2 Articles",
      path: "/support",
    },
  ];
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <section className="mx-auto my-auto w-full bg-bg overflow-hidden h-auto flex items-center justify-center flex-col">
      {/* Support Image */}
      <div className="w-full h-full ">
        <img
          src={"/images/supportImage.svg"}
          className="w-full h-auto object-cover block"
          alt="Support"
        />
      </div>

      {/* Search Section */}
      <div className="space-y-4 xl:space-y-8 px-20 xl:px-80 my-16 w-full flex flex-col items-center justify-center">
        <span>
          <h1 className="font-DMSans text-[32px] leading-[48px] font-bold">
            What can we help you with?
          </h1>
          <p className="font-Inter text-[20px] leading-[30px] font-medium">
            Need Help? Let's guide you.
          </p>
        </span>
        <div className="w-full">
          <Input
            type="tel"
            required
            placeholder="Search by typing a keyword or phrase"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-white font-medium text-[12px] leading-[18px] xl:text-[16px] xl:leading-[24px] w-full px-8 py-6 rounded-lg h-14 xl:h-[72px] shadow-none border-primary outline-primary focus:outline-none"
          />
        </div>
        {/* Search Button */}
        <div className="flex items-center justify-center ">
          <Button
            type="submit"
            onClick={() => {}}
            className="xl:w-[150px] w-[96px] h-[38px] xl:h-[54px] bg-primary hover:bg-secondary text-[13px] leading-[19.5px] xl:text-[16px] xl:leading-[24px] font-semibold text-white py-2 rounded-lg"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Help Categories */}
      <div
        id="help"
        className="bg-primary bg-opacity-20 px-8 xl:px-20 items-center justify-center space-y-6 xl:space-y-16 py-16 font-Inter w-full"
      >
        <div>
          <h1 className="font-DMSans text-[32px] leading-[48px] font-bold">
            Browse our help categories
          </h1>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {helpCat.map((help, index) => (
            <div
              key={index}
              className=" bg-white rounded-lg w-full xl:w-[24%] px-7 py-10"
            >
              <div className="flex flex-col space-y-[18px] h-full">
                <span>
                  <img
                    src={help.icon}
                    alt={help.label}
                    className="w-[56px] h-[56px]"
                  />
                </span>
                <span>
                  <h1 className="text-[18px] leading-[27px] font-bold">
                    {help.label}
                  </h1>
                  <p className="text-[14px] leading-[21px] font-normal">
                    {help.description}
                  </p>
                </span>
                <span className="items-end justify-end ">
                  <Link
                    to={help.path}
                    className="text-[16px] leading-[24px] font-medium text-secondary"
                    key={help.path}
                  >
                    {help.article}
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center space-y-4 xl:space-y-10 bg-white w-[80%] h-[160px] xl:h-[400px]">
        <h1 className="font-DMSans text-lg xl:text-[32px] xl:leading-[48px] font-bold">
          Can't find what you are looking for?
        </h1>
        {/* Contact Button */}
        <div className="flex items-center justify-center ">
          <Button
            onClick={() => navigate("/Contact-Us")}
            className="xl:w-[150px] w-[96px] h-[38px] xl:h-[54px]  bg-primary hover:bg-secondary text-[13px] leading-[19.5px] xl:text-[16px] xl:leading-[24px] font-semibold text-white py-2 rounded-lg"
          >
            Contact Us
          </Button>
        </div>
        <div className="absolute bottom-0 left-0">
          <img
            src="/images/strokes.svg"
            alt="Decorative_strokes"
            className="w-[40%] xl:w-full xl:object-contain h-full block "
          />
          {/* <img
            src="/images/strokessmall.svg"
            alt="Decorative_strokes" 
            className="object-contain h-full block xl:hidden"
            /> */}
        </div>
        <div className="absolute bottom-0 right-0">
          <img
            src="/images/strokes.svg"
            alt="Decorative_strokes"
            className="xl:w-full xl:object-contain h-full hidden xl:block scale-x-[-1]"
          />
          {/* <img
            src="/images/strokessmall.svg"
            alt="Decorative_strokes" 
            className="object-contain h-full block xl:hidden scale-x-[-1]"
            /> */}
        </div>
      </div>
    </section>
  );
};
export default Support;
