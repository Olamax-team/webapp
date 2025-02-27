import React from "react";
import TopHeader from "../footer/TopHeader";
import bgImage from '../../assets/images/bgImage.svg';
// import rectangleA from '../../assets/images/RectangleA.svg'
// import rectangleB from '../../assets/images/RectanglB.svg'
// import rectangleC from '../../assets/images/Rectangle C.svg'
// import rectangleD from '../../assets/images/RectangleD.svg'
// import rectangleZ from '../../assets/images/Rectangle Z.svg'
import { useNavigate } from "react-router-dom";



const Education = () => {
    const navigate = useNavigate();

    const modules = [
        {
            img: "/images/RectangleA.svg", label: "Blockchain Basics",
            value: "Learn about the basics to blockchain technology, its history, principles, and applications.",
            button:"Module 1",
            Link: "/ModuleOne",      
         },
        {
            img:'/images/RectanglB.svg', label:"Cryptocurrency and Earning Oppor...",
            value:"learn the basics of cryptocurrency, strategies for earning, and key aspects of investing.",
            button:"Module 2",
            Link: "/ModuleTwo",
        },
        {
            img: '/images/Rectangle_C.svg', label:"Digital Wallet Security and Safegu...",
            value:"Learn the essentials of cryptocurrency wallet management, private keys, and security protocols.",
            button: "Module 3",
            Link: "/ModuleThree",

        },
        {
            img: '/images/Rectangle_Z.svg', label: "Web3 Fundamentals and Development",
            value:"The principles of Web3, smart contracts, and decentralized applications (dApps) for beginners",
            button: "Module 4",
            Link: "/ModuleFour",
        },
        {
            img:'/images/RectangleD.svg', label: "Artificial Intelligence in Blockchain",
            value:"The integration of artificial intelligence with blockchain technology.",
            button: "Module 5",
            Link: "/ModuleFive",
        }
    ]
    return(
        <React.Fragment>
            <section className="w-full h-auto  flex items-center justify-center  flex-col text-center">
                <div 
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100vh', 
                        
                  }}
                   className="bg-cover bg-center flex flex-col items-start justify-center text-[#FFFFFF] "
                >
                    <div className=" flex flex-col text-left items-start    p-8 xl:p-10  ">
                        <h2 className="font-bold font-DM Sans  text-[18px] xl:text-[32px] leading-[30px] xl:leading-[48px] w-[300px] xl:w-[501px] text-left ">Learn all about cryptocurrency, blockchain & financial literacy</h2>
                        <p className="text-lg  gap-2 flex items-center justify-center text-left">
                            <span className="font-inter font-medium xl:text-[24px] text-[18px] leading-[24px] xl:leading-[27px]">Educational Center</span>
                            <span className="w-16 border-t-2 border-gray-300"></span>
                        </p>
                    </div>
                </div>

                <div className="w-full h-auto flex flex-col items-center justify-center p-5 xl:p-10">
                    <div className="text-center text-[000000]">
                        <h2 className="font-DM Sans font-bold xl:text-[32px] text-[18px] xl:leading-[48px] leading-[32px]  ">Get deeper understanding and knowledge about cryptocurrencies</h2>
                        <p className="font-inter font-medium xl:text-[20px] text-[16px] leading-[26px] xl:leading-[30px]   ">Equip yourself with knowledge</p>
                    </div>
                    <div className="grid grid-cols-1 gap-5  xl:grid-cols-3 lg:grid-cols-3  mt-5  xl:gap-8 ">
                         {modules.map((module, index) => (
                        <div key={index} className=" bg-[#039AE4] w-full h-auto  rounded-lg shadow-lg  ">
                                <div className="w-full h-auto overflow-hidden rounded-sm">
                                <img src={module.img} alt={module.label} className="w-full h-full object-cover" />
                                </div>

                                <h3 className="text-[14px] xl:text-[20px] xl:leading-[30px] leading-[20px] font-bold font-inter p-2 text-center text-white">{module.label}</h3>

                                <p className="text-white text-center  text-[12px] xl:text-[16px] leading-[18px] xl:leading-[24px] font-inter font-medium   ">{module.value}</p>

                                <div className="flex item-left  p-5 ">
                                <button className="  px-4 py-2 bg-white text-[#121826] rounded-[30px] hover:bg-white transition-colors duration-200 font-inter font-meduim  text-[10px] xl:text-[14px] leading-[18px] xl:leading-[21px]"
                                onClick={() => navigate(module.Link)}
                                >
                                {module.button}
                                </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </section>

            <TopHeader/>
        </React.Fragment>
    );
};

export default Education;
