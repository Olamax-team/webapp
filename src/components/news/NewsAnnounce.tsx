import { useState } from "react";
import News from "./News";
import Announcement from "./Announcement";
import { Button } from "../ui/button";
// import news from "../../assets/images/newshero.svg"
// import newsMobile from "../../assets/images/newsheromobile.svg"

const NewsAnnounce = () => {
    const [activeTab, setActiveTab] = useState("News");
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const tabs = ["News", "Announcement"]
    const handleTabClick = (index: number) => {
        setActiveIndex(index);
        const selectedTab = tabs[index];
        setActiveTab(selectedTab);
      };
      const dynamicButtonClassName = (index: number, activeIndex: number) => {
        return index === activeIndex
          ? "text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] font-bold text-primary hover:text-primary"
          : "text-[16px] leading-[24px] xl:text-[18px] xl:leading-[27px] font-bold text-textDark";
      };

    const renderContent = () => {

        switch (activeTab) {
            case "News":
                
                return(
                    <News/>
                );
            case "Announcement":
            
            return(
                <Announcement/>
            );
        
            default:
                return null;
        }
    };

    return (
        <section className="bg-bg overflow-hidden w-full h-auto my-auto flex items-center justify-center flex-col">
            <div 
            className="w-full h-full ">
                <img
                    src={'/images/newshero.svg'}
                    className="w-full h-auto object-cover hidden lg:block"
                    alt="news and announcement"
                />
                <img
                    src={'/images/newsheromobile.svg'}
                    className="w-full h-auto object-cover block lg:hidden"
                    alt="news and announcement"
                />
                  {/* <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                  Stay Updated with the Latest at OLAMAX EXCHANGE
                </div> */}
            </div>
            <div className="px-[20px] xl:px-20 flex h-[64px] bg-white w-full items-center font-Inter">
                {tabs.map((label, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className={`px-5 xl:text-lg font-semibold ${dynamicButtonClassName(index,activeIndex)}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {label}
                    </Button>
                ))}
            </div>
            <div className="px-[20px] xl:px-20 pt-0 xl:pt-10 pb-[20px] xl:pb-20 my-auto mx-auto">
                {renderContent()}
            </div>
        </section>
    );
};

export default NewsAnnounce;