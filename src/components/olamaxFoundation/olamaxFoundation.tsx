// import olamaxFoundation from "../../assets/images/olamaxFoundation.svg";
// import olamaxFoundationMobile from "../../assets/images/olamaxFoundationMobile.svg";
import Donate from "./Donate";
// import goal1 from "../../assets/images/goal 1.svg";
// import goal2 from "../../assets/images/goal 2.svg";
// import goal3 from "../../assets/images/goal 3.svg";
// import goal4 from "../../assets/images/goal 4.svg";
// import thumbnail1 from "../../assets/images/thumbnail1.svg";
// import thumbnail2 from "../../assets/images/thumbnail2.svg";
// import thumbnail3 from "../../assets/images/thumbnail3.svg";
// import youtube from "../../assets/images/YouTube.svg"
import CompPlan from "./ComprehensivePlan";
import { Button } from "../ui/button";

const OlamaxFoundation = () => {

    interface Goals{
        id: number;
        title: string;
        imageUrl :string;
        head: string;
        text: string;
    }
    
    const goals: Goals[] = [
        {
            id: 1,
            title: "Expand Access to Quality Education in Technology",
            imageUrl: '/images/goal 1.svg',
            head:'Expand Access to Quality Education in Technology',
            text:'Introduce tech education from primary school with a curriculum focused on blockchain and AI, aligned to industry trends, and supported through educational partnerships for scalability.',
        },
        {
            id: 2,
            title: "Supply Clean and Renewable Energy to Schools",
            imageUrl: '/images/goal 2.svg',
            head:'Supply Clean and Renewable Energy to Schools',
            text:'Install and maintain solar energy systems in at least 500 underserved schools over five years, with a focus on northern regions and supported by a sustainable network of local operators.',
        },
        {
            id: 3,
            title: "Build Nigeria's Future Tech Workforce",
            imageUrl: '/images/goal 3.svg',
            head:'Build Nigeria’s Future Tech Workforce',
            text:`Develop a talent pipeline to support Nigeria's tech startups, aiming to establish the country as Africa's leading hub for blockchain and AI expertise by 2030.`,
        },
        {
            id: 4,
            title: "Facilitate Global Involvement through Cryptocurrency Donations",
            imageUrl: '/images/goal 4.svg',
            head:'Facilitate Global Involvement through Cryptocurrency Donations',
            text:'Utilize cryptocurrency for seamless, transparent donations, with real-time impact tracking through a public ledger.',
        },
      ];
    
    interface Funding {
        id: number;
        title: string;
        budgetPrice: string;
        percent: number;
    }
    const funding: Funding[] = [
        {
            id: 1,
            title: "Curriculum Development",
            budgetPrice: "$100,000",
            percent: 40,
        },
        {
            id: 2,
            title: "Solar Installations (500 schools)",
            budgetPrice: "2,500,000",
            percent: 75,
        },
        {
            id: 3,
            title: "Training Materials & Tech Equipment",
            budgetPrice: "$500,000",
            percent: 15,
        },
        {
            id: 4,
            title: "Internet Installation",
            budgetPrice: "$300,000",
            percent: 35,
        },
        {
            id: 5,
            title: "Staff and Operational Costs",
            budgetPrice: "$400,000",
            percent: 80,
        },
        {
            id: 6,
            title: "Monitoring & Evaluation",
            budgetPrice: "$200,000",
            percent: 65,
        },
        {
            id: 7,
            title: "Contingency Fund",
            budgetPrice: "$100,000",
            percent: 50,
        }
    ]
    interface Team{
        id: number;
        title: string;
        descr :string;
    }
    
    const team: Team[] = [
        {
            id: 1,
            title: "Board of Directors",
            descr: "The board provides strategic decision-making, vision setting, and oversight, composed of senior advisors in education, energy, technology, and finance. They oversee funding approvals, partnerships, and adherence to organizational goals.",
        },
        {
            id: 2,
            title: "Project Management",
            descr: "The project management team handles day-to-day operations, managing timelines to keep the project on track, and oversees curriculum development, training implementation, and infrastructure installation.",
        },
        {
            id: 3,
            title: "Technical Training and Curriculum Development Team",
            descr: "The curriculum team designs and updates tech-based educational content, develops and trains educators, and implements digital literacy and tech courses.",
        },
        {
            id: 4,
            title: "Clean Energy Operations Team",
            descr: "The clean energy operations team installs, maintains, and monitors solar energy systems in partner schools, providing ongoing technical support, troubleshooting issues, and ensuring reliable energy availability.",
        },
        {
            id: 5,
            title: "Fundraising and Donor Relations Team",
            descr: "The fundraising team secures funding through cryptocurrency donations, grants, and partnerships, managing donor relations, developing transparent reporting methods, and communicating project progress.",
        },
        {
            id: 6,
            title: "Monitoring and Evaluation Team",
            descr: "The monitoring and evaluation team assesses project outcomes, compiles data, and measures effectiveness through regular site visits, feedback collection, impact reporting, and improvement recommendations.",
        },
      ];
    interface JourneyThumbnails{
        id: number;
        title: string;
        imageUrl :string;
        link: string;
    }

    const journeyThumbnails: JourneyThumbnails[] = [
        {
            id: 1,
            title: "EP 1 Pilot Program at ST Jermain's Primary School.",
            imageUrl: '/images/thumbnail1.svg',
            link:"",
        },
        {
            id: 2,
            title: "EP 2 Pilot Program at ST Jermain's Primary School.",
            imageUrl: '/images/thumbnail2.svg',
            link:"",
        },
        {
            id: 3,
            title: "EP 3 Pilot Program at ST Jermain's Primary School.",
            imageUrl: '/images/thumbnail3.svg',
            link:"",
        },
    ];

    return(
        <>
            <section className="bg-bg overflow-hidden w-full h-auto my-auto flex items-center justify-center flex-col">
                {/* Olamax Foundation Image */}
                <div 
                className="w-full h-full relative">
                    <img
                        src={'/images/olamaxFoundation.svg'}
                        className="w-full h-auto object-cover hidden lg:block"
                        alt="Empowering Nigeria"
                    />
                    <img
                        src={'/images/olamaxFoundationMobile.svg'}
                        className="w-full h-auto object-cover block lg:hidden"
                        alt="Empowering Nigeria"
                    />
                    <div className="absolute top-1/3 left-10 xl:top-36 xl:left-36 w-[479px] h-fit flex flex-col items-start justify-start text-white text-xl font-semibold">
                        <h1 className="font-DMSans text-[20px] xl:text-[32px] leading-[150%] font-bold">Empowering Nigeria with Tech<br />Education & Clean Energy</h1>

                        <div className="flex items-center space-x-2 mt-2 font-Inter text-[14px] xl:text-[18px] leading-[150%] font-medium">
                            <h1>OLAMAX Foundation</h1>
                            <div className="border-t-2 border-white w-40"></div>
                        </div>
                    </div>
                </div>

                {/* Our Mission */}
                <div className="flex flex-row flex-wrap xl:flex-nowrap w-full mx-5 xl:mx-20 my-8 xl:my-20 gap-16">
                    <div className="w-full xl:w-1/2 px-5">
                        <h1 className="font-DMSans text-[18px] leading-[27px] xl:text-[32px] xl:leading-[48px] font-bold">Our Mission</h1>
                        <p className="text-[14px] leading-[21px] xl:text-[18px] xl:leading-[27px] font-medium font-Inter">The Olamax Foundation is dedicated to advancing two essential Sustainable Development Goals (SDGs) in Nigeria: Quality Education (SDG 4) and Affordable and Clean Energy (SDG 7). Recognizing the transformative potential of technology and renewable energy, our vision is to empower Nigeria's youth with tech-based skills from an early age while ensuring access to reliable, clean energy sources for schools, particularly in under-resourced areas in the northern regions of Nigeria.<br/><br/>
                            This initiative will not only bolster Nigeria's position in the global tech space, particularly in sectors like blockchain and artificial intelligence (AI), but also contribute to a cleaner, more sustainable future.
                            To achieve this vision, we will provide tech skills training, clean energy infrastructure, and free internet to support learning in primary and secondary schools across Nigeria. 
                            <br/><br/>Our ambitious goal is to train thousands in tech skills, nurturing a future-ready workforce for Nigerian startups, including our own. With the support of cryptocurrency donations, we invite you to join us in building a more sustainable, technologically advanced Nigeria.</p>
                    </div>
                    <div className="w-full xl:w-1/2 items-center px-9 xl:px-0">
                        <Donate/>
                    </div>
                </div>

                {/* Goals & Objectives */}
                <div className="w-full">
                    <div className="items-center justify-center mx-auto">
                        <h1 className="text-center font-DMSans text-[18px] leading-[27px] xl:text-[32px] xl:leading-[48px] font-bold">Goals & Objectives</h1>
                        <p className="text-[14px] leading-[21px] xl:text-[20px] xl:leading-[30px] font-medium text-center">What we aim to achieve</p>
                    </div>
                    <div className="flex flex-row flex-wrap xl:flex-nowrap mt-6 xl:mt-10 w-full">
                        {goals.map((item) => (
                            <div className="relative w-1/2 xl:w-full overflow-hidden">
                                <img
                                    key={item.id}
                                    src={item.imageUrl} 
                                    alt={item.title}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="bg-darkBg bg-opacity-60 absolute bottom-0 left-0 xl:bottom-0 xl:left-0 p-4 xl:p-8 w-full h-1/2 flex text-wrap items-start justify-start text-white">
                                    <div className="flex flex-wrap items-center justify-between w-full">
                                        <h1 className="text-wrap font-Inter text-[12px] xl:text-[21px] leading-[150%] font-bold">{item.head}</h1>
                                        <h1 className="flex items-center text-wrap font-Inter text-[8px] xl:text-[16px] leading-[150%] font-normal">{item.text}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="my-20 space-y-8 xl:space-y-20 mx-5 xl:mx-[138px]">
                        {/* Comprehensive Plan */}
                        <CompPlan/>

                        {/* Our Team */}
                        <div className="items-center justify-center mx-auto">
                            <h1 className="text-center font-DMSans text-[18px] leading-[27px] xl:text-[32px] xl:leading-[48px] font-bold">Our Team</h1>
                            <p className="text-[14px] leading-[21px] xl:text-[20px] xl:leading-[30px] font-medium text-center mb-10">The brain behind the scenes</p>
                            <div className="flex flex-row flex-wrap justify-center gap-6 w-full font-Inter">
                                {team.map((item) => (
                                    <div 
                                    key={item.id} 
                                    className="w-full xl:w-[30%] bg-white rounded-lg overflow-hidden"
                                    >
                                        <div className={`flex items-center w-full h-20 ${item.id%2 === 0 ?`bg-textDark text-white`:`bg-primary text-textDark` } px-7`}>
                                            <h1 className="font-bold text-[18px] leading-[27px]">{item.title}</h1>
                                        </div>
                                            <p className="ml-[25px] mt-[13px] font-normal text-[18px] leading-[27px] mb-[25px] xl:mb-[65px]">{item.descr}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Funding */}
                        <div className="items-center justify-center mx-auto">
                            <h1 className="text-center font-DMSans text-[18px] leading-[27px] xl:text-[32px] xl:leading-[48px] font-bold">Funding & Budget</h1>
                            <p className="text-[14px] leading-[21px] xl:text-[20px] xl:leading-[30px] font-medium text-center mb-10">Insight to the projected budget</p>
                            <div className="mx-auto space-y-6 w-auto">
                                {funding.map((item) => (
                                    <div
                                    key={item.id}
                                    className="flex flex-row flex-wrap xl:flex-nowrap w-full font-Inter"
                                    >
                                        <span className="text-nowrap flex-shrink-0 order-1 w-1/2 xl:w-[30%] mb-3 xl:mb-0 text-[12px] leading-[18px] xl:text-[18px] xl:leading-[27px] font-bold">
                                            <h1 className="w-full">{item.title}</h1>
                                        </span>
                                        <div className="relative w-full xl:w-[70%] h-5 xl:h-[38px] xl:mr-[84px] order-last xl:order-2">
                                            <div
                                                className="absolute top-0 left-0 h-full w-full bg-primary opacity-20"
                                            ></div>
                                            <div
                                                className="absolute top-0 left-0 h-full bg-primary"
                                                style={{ width: `${item.percent}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-end w-1/2 xl:w-[5%] flex-shrink-0 mb-3 xl:mb-0 order-2 xl:order-last text-[12px] leading-[18px] xl:text-[18px] xl:leading-[27px] font-bold">
                                            {item.budgetPrice}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="my-4 mx-5 xl:mx-[69px] xl:mx- xl:my-10">
                                <p className="text-center font-Inter font-semibold text-[14px] leading-[21px] xl:text-[20px] xl:leading-[30px]">Join us in building a sustainable, tech-enabled future for Nigeria. Your cryptocurrency donation will directly support the installation of clean energy infrastructure, delivery of quality education, and the empowerment of a new generation of tech leaders.</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <Button
                                className="font-Inter xl:font-poppins py-[15px] px-[25px] bg-primary hover:bg-secondary text-white rounded-lg text-[13px] xl:text-[16px] leading-[19.5px] xl:leading-[24px] font-semibold w-[96px] h-[38px] xl:w-[150px] xl:h-[54px]">
                                    Donate
                                </Button>
                            </div>
                        </div>

                        {/* Impact and Updates Section */}
                        <div className="hidden lg:block items-center justify-center m-auto">
                            <h1 className="text-center font-DMSans text-[18px] leading-[27px] xl:text-[32px] xl:leading-[48px] font-bold">Impact & Updates Section</h1>
                            <p className="text-[14px] leading-[21px] xl:text-[20px] xl:leading-[30px] font-medium text-center mb-10">Follow us on our journey</p>
                            <div className="flex flex-row flex-nowrap gap-4 w-full justify-center font-Inter">
                                {journeyThumbnails.map((item) => (
                                    <div 
                                    key={item.id} 
                                    className="w-1/3"
                                    >
                                        <a href={item.link} target="_blank" className=" w-full relative block">
                                            <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className=" w-full h-auto object-contain rounded-lg"
                                            />
                                            <img
                                                src={'/images/YouTube.svg'}
                                                alt="Play Video"
                                                className="absolute inset-0 m-auto w-16 h-16 opacity-90"
                                            />
                                        </a>
                                        <h2>{item.title}</h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OlamaxFoundation;