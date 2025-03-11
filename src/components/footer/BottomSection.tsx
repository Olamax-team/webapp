// import logo from '../../assets/images/olamax_logo_2.png'
// import googleplaylogo from '../../assets/images/googleplay.png';
// import applestorelogo from '../../assets/images/appstore.png';
// import whatsapp from '../../assets/images/whatsapp.png';
// import email from '../../assets/images/email.png';
// import call from '../../assets/images/call.png';
import { Link } from 'react-router';

const links = {
  company: [
    {
      label: 'About Us',
      path: '/about-us'
    },
    {
      label: 'News & Anouncement',
      path: '/news-and-announcement'
    },
    {
      label: 'Olamax Foundation',
      path: '/olamax-foundation'
    },
    {
      label: 'Educational Center',
      path: '/educational-center'
    },
    {
      label: 'Referral Program',
      path: '/referral-program'
    },
  ],
  legal: [
    {
      label: 'Terms of Service',
      path: '/terms'
    },
    {
      label: 'Privacy Policy',
      path: '/privacy'
    },
    {
      label: 'Cookies',
      path: '/cookies'
    },
  ],
  support: [
    {
      label: 'Help Center',
      path: '/support#help'
    },
    {
      label: 'Leave us a message',
      path: '/support#contact'
    },
    {
      label: 'OTC Desk',
      path: '/otc-desk'
    },
    {
      label: 'FAQ',
      path: '/faq'
    },
  ],
  contact: [
    {
      label: 'support@olamax.io',
      path: '/support-us',
      image: "/images/email.png",
    },
    {
      label: 'Call Us',
      path: '/call-us',
      image: "/images/call.png",
    },
    {
      label: 'Message Us',
      path: '/message-us',
      image: "/images/whatsapp.png",
    }
  ],  
};

const BottomSection = () => {
  const date = new Date();

  return (
    <>
    {/* desktop version of footer */}
      <div className='w-full hidden lg:flex flex-col gap-4'>
        <div className="w-[90%] mx-auto lg:py-[44px] flex gap-14">
          <div className="w-[25%] flex flex-col gap-8">
            <Link to={'/'} className="block w-[153px] h-[54px]">
              <img src={"/images/olamax_logo_2.png"} alt="logo" className='object-cover'/>
            </Link>
            <div className="flex flex-col gap-3">
              <h2 className='font-bold text-[26px] leading-normal font-DMSans mb-3'>Download the Mobile App</h2>
              <Link  to={'/'} className='block w-[203.9px] h-[59px]'>
                <img src={"/images/googleplay.png"} alt="googleplay_logo" className='object-cover'/>
              </Link>
              <Link  to={'/'} className='block w-[203.9px] h-[59px]'>
                <img src={"/images/appstore.png"} alt="applestore_logo" className='object-cover'/>
              </Link>
            </div>
          </div>
          <div className='w-[75%] grid grid-cols-4 gap-12'>
            <div className="w-full h-full">
              <h2 className='text-lg font-semibold mb-5 font-DMSans'>Company</h2>
              <div className='flex flex-col gap-4'>
                {links.company.map((item) => (
                  <Link to={item.path} className='block font-Inter' key={item.path}>{item.label}</Link>
                ))}
              </div>
            </div>
            <div className="w-full h-full">
              <h2 className='text-lg font-semibold mb-5 font-DMSans'>Legal</h2>
              <div className='flex flex-col gap-4'>
                {links.legal.map((item) => (
                  <Link to={item.path} className='block font-Inter' key={item.path}>{item.label}</Link>
                ))}
              </div>              
            </div>
            <div className="w-full h-full">
              <h2 className='text-lg font-semibold mb-5 font-DMSans'>Support</h2>
              <div className='flex flex-col gap-4'>
                {links.support.map((item) => (
                  <Link to={item.path} className='block font-Inter' key={item.path}>{item.label}</Link>
                ))}
              </div> 
            </div>
            <div className="w-full h-full">
              <h2 className='text-lg font-semibold mb-5 font-DMSans'>Contact Us</h2>
              <div className='flex flex-col gap-4'>
                {links.contact.map((item) => (
                  <Link to={item.path} className='flex font-Inter items-center gap-2' key={item.path}>
                    <div className="size-[16.67px]">
                      <img src={item.image} alt="icon" className='object-cover'/>
                    </div>
                    {item.label}
                  </Link>
                ))}
              </div>              
            </div>
          </div>
        </div>
        <div className="w-[96%] border-b-[3px] mx-auto"/>
        <div className='p-5 flex items-center justify-center tracking-wider'>
          <span className='text-lg'>&copy; {date.getFullYear()} OLAMAX, All Rights Reserved.</span>
        </div>
      </div>

    {/* mobile version of footer */}
      <div className="w-full lg:hidden flex-col gap-4 py-[40px]">
        <div className="w-[90%] md:[80%] mx-auto flex flex-col gap-6">
          <Link to={'/'} className="block w-[110px] h-[34px]">
            <img src={"/images/olamax_logo_2.png"} alt="logo" className='object-cover'/>
          </Link>
          <div className="grid grid-cols-2 gap-8">
            <div className="w-full h-full">
              <h2 className='text-lg font-semibold mb-5 font-DMSans'>Company</h2>
              <div className='flex flex-col gap-4'>
                {links.company.map((item) => (
                  <Link to={item.path} className='block font-Inter' key={item.path}>{item.label}</Link>
                ))}
              </div>
            </div>
            <div className="w-full h-full">
              <h2 className='text-lg font-semibold mb-5 font-DMSans'>Legal</h2>
              <div className='flex flex-col gap-4'>
                {links.legal.map((item) => (
                  <Link to={item.path} className='block font-Inter' key={item.path}>{item.label}</Link>
                ))}
              </div>              
            </div>
            <div className="w-full h-full">
              <h2 className='text-lg font-semibold mb-5 font-DMSans'>Support</h2>
              <div className='flex flex-col gap-4'>
                {links.support.map((item) => (
                  <Link to={item.path} className='block font-Inter' key={item.path}>{item.label}</Link>
                ))}
              </div> 
            </div>
            <div className="w-full h-full">
              <h2 className='text-lg font-semibold mb-5 font-DMSans'>Contact Us</h2>
              <div className='flex flex-col gap-4'>
                {links.contact.map((item) => (
                  <Link to={item.path} className='flex font-Inter items-center gap-2' key={item.path}>
                    <div className="size-[16.67px]">
                      <img src={item.image} alt="icon" className='object-cover'/>
                    </div>
                    {item.label}
                  </Link>
                ))}
              </div>              
            </div>
          </div>
          <div className="flex gap-3 flex-col">
            <h2 className='font-bold text-lg font-DMSans mb-3'>Download the Mobile App</h2>
            <div className="flex items-center gap-4">
              <Link  to={'/'} className='block w-[172px] h-[50px]'>
                <img src={"/images/googleplay.png"} alt="googleplay_logo" className='object-cover'/>
              </Link>
              <Link  to={'/'} className='block w-[172px] h-[50px]'>
                <img src={"/images/appstore.png"} alt="applestore_logo" className='object-cover'/>
              </Link>
            </div>
          </div>
          <div className="w-[96%] border-b-[3px] mx-auto"/>
          <div className='flex items-center justify-center tracking-wider'>
            <span className='text-sm'>&copy; {date.getFullYear()} OLAMAX, All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomSection