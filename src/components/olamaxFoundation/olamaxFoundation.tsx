import olamaxFoundation from "../../assets/images/olamaxFoundation.svg";
import olamaxFoundationMobile from "../../assets/images/olamaxFoundationMobile.svg";
import Donate from "./Donate";
import goal1 from "../../assets/images/goal 1.svg"
import goal2 from "../../assets/images/goal 2.svg"
import goal3 from "../../assets/images/goal 3.svg"
import goal4 from "../../assets/images/goal 4.svg"
import CompPlan from "./ComprehensivePlan";

const OlamaxFoundation = () => {

    interface Goals{
        id: number;
        title: string;
        imageUrl :string;
    }
    
    const goals: Goals[] = [
        {
            id: 1,
            title: "Expand Access to Quality Education in Technology",
            imageUrl: goal1,
        },
        {
            id: 2,
            title: "Supply Clean and Renewable Energy to Schools",
            imageUrl: goal2,
        },
        {
            id: 3,
            title: "Build Nigeria's Future Tech Workforce",
            imageUrl: goal3,
        },
        {
            id: 4,
            title: "Facilitate Global Involvement through Cryptocurrency Donations",
            imageUrl: goal4,
        },
      ];
    
    interface JourneyThumbnails{
        id: number;
        title: string;
        imageUrl :string;
    }

    const journeyThumbnails: JourneyThumbnails[] = [
        {
            id: 1,
            title: "EP 1 Pilot Program at ST Jermain's PrimarySchool.",
            imageUrl: goal1,
        },
    ];

    return(
        <>
            <section className="bg-bg overflow-hidden w-full h-auto my-auto flex items-center justify-center flex-col">
                <div 
                className="w-full h-full ">
                    <img
                        src={olamaxFoundation}
                        className="w-full h-auto object-cover hidden lg:block"
                        alt="Empowering Nigeria"
                    />
                    <img
                        src={olamaxFoundationMobile}
                        className="w-full h-auto object-cover block lg:hidden"
                        alt="Empowering Nigeria"
                    />
                </div>
                <div className="flex flex-row mx-20 my-20 gap-16">
                    <div className="w-1/2">
                        <h1 className="font-DMSans text-[32px] leading-[48px] font-bold">Our Mission</h1>
                        <p>The Olamax Foundation is dedicated to advancing two essential Sustainable Development Goals (SDGs) in Nigeria: Quality Education (SDG 4) and Affordable and Clean Energy (SDG 7). Recognizing the transformative potential of technology and renewable energy, our vision is to empower Nigeria's youth with tech-based skills from an early age while ensuring access to reliable, clean energy sources for schools, particularly in under-resourced areas in the northern regions of Nigeria.<br/><br/>
                            This initiative will not only bolster Nigeria's position in the global tech space, particularly in sectors like blockchain and artificial intelligence (AI), but also contribute to a cleaner, more sustainable future.
                            To achieve this vision, we will provide tech skills training, clean energy infrastructure, and free internet to support learning in primary and secondary schools across Nigeria. 
                            <br/><br/>Our ambitious goal is to train thousands in tech skills, nurturing a future-ready workforce for Nigerian startups, including our own. With the support of cryptocurrency donations, we invite you to join us in building a more sustainable, technologically advanced Nigeria.</p>
                    </div>
                    <div className="w-1/2">
                        <Donate/>
                    </div>
                </div>
                <div className="w-full">
                    <div className="items-center justify-center mx-auto">
                        <h1 className="text-center font-DMSans text-[32px] leading-[48px] font-bold">Goals & Objectives</h1>
                        <p className="text-center">What we aim to achieve</p>
                    </div>
                    <div className="flex flex-row mt-10 mb-20">
                        {goals.map((item) => (
                            <img
                                key={item.id}
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                             />
                        ))}
                    </div>
                    <div className="my-20 space-y-20 mx-5 xl:mx-[138px]">
                        <CompPlan/>
                        <div>
                            Our Team
                        </div>
                        <div>
                            Funding & Budget
                        </div>
                    </div>
                    <div>
                        Impact & Updates Section
                    </div>
                </div>
            </section>
        </>
    );
};

export default OlamaxFoundation;