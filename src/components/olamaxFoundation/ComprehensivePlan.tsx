import { Calendar } from "lucide-react";
import phase1 from "../../assets/images/phase1.svg";
import phase2 from "../../assets/images/phase2.svg";
import phase3 from "../../assets/images/phase3.svg";
const CompPlan = () => {

    interface Phases{
        id: number;
        title: string;
        duration: string;
        imageUrl :string;
        description:string[];
    }
    
    const phases: Phases[] = [
        {
            id: 1,
            title: "Phase 1: Research, Development, and Initial Pilot Programs",
            duration: "1 - 6 Months",
            imageUrl: phase1,
            description: [
                "Needs Assessment: Conduct a thorough needs assessment in targeted schools in the northern regions, identifying gaps in energy, educational resources, and digital infrastructure.",
                "Curriculum Development: Develop a tech-focused curriculum for primary and secondary schools in collaboration with educational consultants, covering topics such as blockchain basics, coding, AI fundamentals, and digital literacy.",
                "Solar Infrastructure Pilot: Initiate a pilot program to install solar energy systems in 20 schools, assess challenges, and adjust the approach as necessary.",
                "Internet Access Testing: Install internet connectivity in these schools and evaluate accessibility, speed, and effectiveness for tech skill training."
            ]
        },
        {
            id: 2,
            title: "Phase 2: Expansion and Scaling",
            duration: "6 - 24 Months",
            imageUrl: phase2,
            description: [
                "Tech Skills Training Rollout: Implement the tech curriculum in additional schools, initially targeting 100 schools in the northern region and expanding to other areas as resources allow.",
                "Clean Energy Expansion: Scale the solar installation initiative to reach 200 schools within this phase, ensuring maintenance and operational support.",
                "Train-the-Trainer Program: Train local educators and tech experts to deliver the curriculum sustainably, ensuring quality and consistency across regions.",
                "Monitoring and Evaluation: Develop a tracking system to monitor student progress, energy usage, and overall project effectiveness."
            ]
        },
        {
            id: 3,
            title: "Phase 3: Long-Term Sustainability and Impact Evaluation",
            duration: "24+ Months",
            imageUrl: phase3,
            description: [
                "Continuous Training and Curriculum Updates: Adapt curriculum content to evolving tech trends, ensuring students remain competitive in the job market.",
                "Nationwide Expansion: Increase the number of schools with access to both clean energy and tech education, aiming to impact all underserved regions.",
                "Impact Measurement: Publish an annual report detailing the project’s impact, success stories, and areas for improvement.",
                "Public-Private Partnerships: Partner with government bodies, NGOs, and tech firms to expand reach and enhance resource availability."
            ]
        }
    ];
    


    return(
        <section className="mx-auto my-auto">
            <div>
                <h1 className="text-center font-DMSans text-[18px] leading-[27px] xl:text-[32px] xl:leading-[48px] font-bold">Comprehensive Plan</h1>
                <p className="text-[14px] leading-[21px] xl:text-[20px] xl:leading-[30px] font-medium text-center">Take a look at our plan</p>
            </div>
            <div className="flex flex-col space-y-10 mt-3 xl:mt-10">
                {phases.map((item)=>(
                    <div className="flex flex-col xl:flex-row xl:gap-40">      
                        <div className="w-full xl:w-1/2 mx-auto my-auto">
                            <img
                            src={item.imageUrl}
                            alt={item.title}
                            className={`mx-auto w-auto ${item.imageUrl === phase2 ? 'order-last' : 'order-first'} h-auto object-contain`}
                            />
                        </div>
                        <div className={`items-start w-full xl:w-1/2 font-Inter ${item.imageUrl === phase2 ? 'order-first' : 'order-last'}`}>
                            <h1 className="text-[16px] leading-[24px] xl:text-[20px] xl:leading-[30px] font-bold text-nowrap">{item.title}</h1>
                            <span className="flex gap-2 text-[14px] leading-[21px] xl:text-[18px] xl:leading-[27px] font-bold"><Calendar size={24}/>{item.duration}</span>
                            <ul className="space-y-6 font-normal text-base">
                                {item.description.map((point, index) => {
                                    const [boldText, ...rest] = point.split(":");
                                    return (
                                        <li key={index} className="list-disc ml-4">
                                            <span className="font-medium text-lg">{boldText}:</span>{rest.join(":")}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CompPlan;