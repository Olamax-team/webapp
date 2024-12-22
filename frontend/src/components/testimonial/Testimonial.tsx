import image4 from '../../assets/images/avatar_4.png'
import image1 from '../../assets/images/avatar_1.png'
import image2 from '../../assets/images/avatar_2.png'
import image3 from '../../assets/images/avatar_3.png'
import ImageAvatar from '../ui/image-avatar';


const testimonialList = [
  {
    name: "Olumide Fashola",
    role: "Day to Day Trader",
    testimony: "I like that Olamax takes their time to improve on their processes and feedback from users. It’s a good one for the team to be innovative.",
    image: image4
  },
  {
    name: "David Rasmus",
    role: "CEO X.inc",
    testimony: "For me, and a couple of my friends, what we found most interesting about Olamax is that human interaction. The team is always fantastic and they don’t make you feel alone even if it’s your first time trading. Love it!",
    image: image1
  },
  {
    name: "Elias Timble",
    role: "Student",
    testimony: "My first interaction with the Olamax platform was through referral from a friend. I had to ditch a global platform for a simpler and easier interface. It’s been a worthwhile decision.",
    image: image2
  },
  {
    name: "Esther Friday",
    role: "Trader",
    testimony: "I was really skeptical about crypto trading thinking it was too complex till I was introduced to Olamax. I discovered the platform is easy to navigate and understand. It’s perfect for novices and suitable for more advanced traders.",
    image: image3
  },
];

type testimonialCard = {
  name: string;
  role: string;
  testimony: string;
  image: string;
}

const Testimonial = () => {

  const TestimonialCard = ({name, role, testimony, image}:testimonialCard) => {
    return (
      <div className="rounded-[10px] bg-[#f5f5f5] w-full lg:h-full md:p-6 p-4 flex flex-col gap-6 group hover:bg-primary hover:text-white cursor-pointer">
        <div className='flex gap-5'>
          <ImageAvatar image={image} style='md:size-[40px] size-[32px] group-hover:border group-hover:border-2 group-hover:border-white'/>
          <div className="flex flex-col">
            <h3 className='md:text-base text-[13px] leading-normal font-Inter font-semibold'>{name}</h3>
            <p className='text-[10px] md:text-[13px] leading-normal font-Inter text-[#545454] group-hover:text-white'>{role}</p>
          </div>
        </div>
        <p className='md:text-base font-Inter leading-normal text-[12px]'>{testimony}</p>
      </div>
    )
  };

  return (
    <div className="w-full bg-white h-auto lg:h-[650px] border flex flex-col justify-center py-12 lg:py-0">
      <div className="w-[90%] mx-auto lg:space-y-16 space-y-10">
        <h2 className="w-[177px] h-[54px] md:w-[311px] md:h-[96px] md:text-[32px] text-lg leading-normal font-bold font-DMSans">
          What Our Users Say About <span className="text-primary">OLAMAX</span>
        </h2>
        <div className="w-full lg:h-[320px] grid lg:grid-cols-4 grid-cols-2 gap-3">
          {testimonialList.map((item) => (
            <TestimonialCard {...item} key={item.name}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonial;