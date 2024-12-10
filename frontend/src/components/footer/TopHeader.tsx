import deskBanner from '../../assets/images/Rectangle 45.png';
import mobBanner from '../../assets/images/Rectangle 4763.png';
import instagram from '../../assets/images/Vector_1.png';
import facebook from '../../assets/images/Vector_2.png';
import x from '../../assets/images/Vector_3.png';
import youtube from '../../assets/images/Vector_4.png';
import linkedin from '../../assets/images/Vector.png';
import send from '../../assets/images/Vector_5.png';
import React from 'react';


const mediaList = [
  {
    name: 'linkedin',
    path: 'https://www.linkedin.com/in/olamax',
    image: linkedin
  },
  {
    name: 'instagram',
    path: 'https://www.instagram.com/olamax',
    image: instagram
  },
  {
    name: 'facebook',
    path: 'https://www.facebook.com/olamax',
    image: facebook
  },
  {
    name: 'youtube',
    path: 'https://www.youtube.com/olamax',
    image: youtube
  },
  {
    name: 'x',
    path: 'https://www.x.com/olamax',
    image: x
  },
]

const TopHeader = () => {
  const [email, setEmail] = React.useState('');
  const [showError, setShowError] = React.useState(false);

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
    <div className="w-full relative min-h-[480px]">
      <img src={deskBanner} alt="footer_banner" className='object-cover w-full h-full hidden xl:block'/>
      <img src={mobBanner} alt="footer_banner" className='object-cover w-full h-full xl:hidden'/>
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
        <div className="xl:w-[1110px] xl:h-[400px] rounded-[20px] border-[3px] bg-black/20 backdrop:blur-xl text-white flex items-center justify-center">
          <div className="w-[583px] h-[292px] flex flex-col items-center justify-between">
            <div className='flex flex-col items-center'>
              <h2 className='font-DMSans text-[32px] leading-[48px] font-bold'>Join the OLAMAX Community Today !</h2>
              <p className='w-[407px] h-[48p] text-base text-center mt-2 font-Inter'>Stay in touch with the latest news, releases exclusive deals and promotions</p>
              <div className="flex items-center justify-center gap-6 mt-8">
                {mediaList.map((item) => (
                  <a href={item.path} target="_blank" rel="noopener noreferrer" className='size-[32px] block'>
                    <img src={item.image} alt={item.name} />
                  </a>
                ))}
              </div>
            </div>
            {showError &&  <h2 className='text-red-600 bg-white/40 px-1 py-1 rounded'>You cannot submit an empty field!!!</h2>}
            <form className='w-[511px] h-[44px] mx-auto flex items-center border-b border-white pb-1' onSubmit={subscribeUser}>
              <input type="email" className='h-full flex-1 bg-inherit focus:outline-none placeholder:text-white text-[23px]' placeholder='Sign up for Newsletter' onChange={(evt) => setEmail(evt.target.value)}/>
              <button className="size-[32px] flex-none flex items-center justify-center" type='submit'>
                <img src={send} alt="send_button" className='object-cover'/>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader