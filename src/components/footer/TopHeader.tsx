// import deskBanner from '../../assets/images/Rectangle 45.png';
// import mobBanner from '../../assets/images/Rectangle 4763.png';
// import instagram from '../../assets/images/Vector_1.png';
// import facebook from '../../assets/images/Vector_2.png';
// import x from '../../assets/images/Vector_3.png';
// import youtube from '../../assets/images/Vector_4.png';
// import linkedin from '../../assets/images/Vector.png';
// import send from '../../assets/images/Vector_5.png';
import React from 'react';


const mediaList = [
  {
    name: 'linkedin',
    path: 'https://www.linkedin.com/in/olamax',
    image: '/images/Vector.png'
  },
  {
    name: 'instagram',
    path: 'https://www.instagram.com/olamax',
    image: '/images/Vector_1.png'
  },
  {
    name: 'facebook',
    path: 'https://www.facebook.com/olamax',
    image: '/images/Vector_2.png'
  },
  {
    name: 'youtube',
    path: 'https://www.youtube.com/olamax',
    image: '/images/Vector_4.png'
  },
  {
    name: 'x',
    path: 'https://www.x.com/olamax',
    image: '/images/Vector_3.png'
  },
]

const TopHeader = () => {
  const [email, setEmail] = React.useState('');
  const [showError, setShowError] = React.useState(false);

  // submit and validate form
  const subscribeUser = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setShowError(false)
    if (email.trim().length < 1) {
      setShowError(true)
    } else {
      console.log(email);
    }
  }
  
  return (
    <div className="w-full relative md:border overflow-hidden">
      {/* image for the desktop and medium screen */}
      <img src={'/images/Rectangle_45.png'} alt="footer_banner" className='object-cover lg:min-h-[480px] md:min-h-[500px] w-full h-full hidden md:block'/>
      {/* image for the mobile only */}
      <img src={'/images/Rectangle_4763.png'} alt="footer_banner" className='object-cover h-[400px] w-full md:hidden'/>
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
        <div className="w-[80%] md:h-[400px] min-h-[320px] rounded-[20px] border-[3px] bg-black/20 backdrop-blur-sm text-white flex items-center justify-center">
          <div className="w-[80%] md:h-[292px] h-[262px] flex flex-col items-center justify-between">
            <div className='flex flex-col items-center'>
              <h2 className='font-DMSans md:text-[32px] md:leading-[48px] text-[18px] leading-[27px] font-bold text-center'>Join the OLAMAX Community Today !</h2>
              <p className='md:w-[407px] md:h-[48p] md:text-base md:leading-[24px] text-[13px] leading-[19.5px] text-center mt-2 font-Inter'>Stay in touch with the latest news, releases exclusive deals and promotions</p>
              <div className="flex items-center justify-center gap-6 mt-8">
                {mediaList.map((item) => (
                  <a href={item.path} target="_blank" rel="noopener noreferrer" className='size-[32px] flex items-center justify-center' key={item.name}>
                    <img src={item.image} alt={item.name} className='object-cover'/>
                  </a>
                ))}
              </div>
            </div>
            {showError &&  <h2 className='text-red-600 bg-white/40 px-1 py-1 rounded text-[13px] md:text-base md:leading-[24px] leading-[19.5px]'>You cannot submit an empty field!!!</h2>}
            <form className='w-[90%] h-[44px] mx-auto flex items-center border-b border-white pb-1' onSubmit={subscribeUser}>
              <input type="email" className='h-full flex-1 bg-inherit focus:outline-none placeholder:text-white md:text-[23px] text-base' placeholder='Sign up for Newsletter' onChange={(evt) => setEmail(evt.target.value)}/>
              <button className="size-[32px] flex-none flex items-center justify-center" type='submit'>
                <img src={'/images/Vector_5.png'} alt="send_button" className='object-cover'/>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader;