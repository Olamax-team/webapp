import React from 'react';
import { ChevronDown, Menu, X} from 'lucide-react';
import { Link } from 'react-router-dom'
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import fastTrade from '../../assets/images/eva--swap-fill 1.png';
import airtimeData from '../../assets/images/device-mobile.png';
import billPayment from '../../assets/images/healthicons_electricity.png';
import helpCenter from '../../assets/images/fluent_person-support-28-filled.png';
import chatUs from '../../assets/images/bxs_chat.png';
import faq from '../../assets/images/mdi_faq.png';
import aboutUs from '../../assets/images/zondicons_badge.png'
import building from '../../assets/images/md-library.png'
import news from '../../assets/images/mingcute_news-2-fill.png'
import education from '../../assets/images/game-icons_graduate-cap.png'
import money from '../../assets/images/cash.png'

type menuItemProps = {
  image: string;
  title: string;
  description: string;
  path: string;
};

type dropDownMenuProps = {
  menuList: menuItemProps[];
  style: string;
  isOpen: boolean
};

const tradeCryptoList = [
  {
    path: '/fast-trade',
    image: fastTrade,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Fast Trade'
  },
  {
    path: '/airtime-data',
    image: airtimeData,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Airtime & Data'
  },
  {
    path: '/bill-payment',
    image: billPayment,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Bills & Payment'
  },
];

const supportList = [
  {
    path: '/help-center',
    image: helpCenter,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Help Center'
  },
  {
    path: '/chat-us',
    image: chatUs,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Chat Us'
  },
  {
    path: '/frequently-asked-questions',
    image: faq,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Frequently Asked Questions'
  },
];

const moreList = [
  {
    path: '/about-us',
    image: aboutUs,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'About Us'
  },
  {
    path: '/olamax-foundation',
    image: building,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Olamax Foundation'
  },
  {
    path: '/news-and-announcement',
    image: news,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'News And Announcement'
  },
  {
    path: '/educational-center',
    image: education,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Educational Center'
  },
  {
    path: '/referral-program',
    image: money,
    description: 'Buy crypto with Mastercard, Visa, Fiat balance.',
    title: 'Referral Program'
  },
];

const BottomHeader = () => {
  const [openTrade, setOpenTrade] = React.useState(false);
  const [openSupport, setOpenSupport] = React.useState(false);
  const [openMore, setOpenMore] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);

  // navbar styles for normal
  const navbar = 'bg-bgSurface w-full h-[64px] xl:h-[100px] shadow shadow-[4px_4px_4px_0_rgba(0, 0, 0, 0.3)]';

  // navbar styles for fixed 
  const navbarFixed = 'bg-bgSurface z-[4000] fixed w-full h-[64px] xl:h-[100px] -top-[100px] transform translate-y-[100px] transition-all ease-out duration-1000 shadow shadow-[4px_4px_4px_0_rgba(0, 0, 0, 0.3)]';

  const [navIsFixed, setNavIsFixed] = React.useState(navbar);

// for closing menu when links are clicked on
  const closeMenu = () => {
    if (openTrade) {
      setOpenSupport(false);
      setOpenMore(false);
    }

    if (openSupport) {
      setOpenSupport(false);
      setOpenMore(false)
    }

    if (openMore) {
      setOpenSupport(false);
      setOpenTrade(false)
    }
  };

  // for toggling navbar styles between bein normal and being fixed navbar
  const toggleNavbarState = React.useCallback(() => {
    if (window.scrollY >= 80) {
      setNavIsFixed(navbarFixed);
    } else {
      setNavIsFixed(navbar);
    }

  }, [navbar]);

  // for controlling it with useEffect
  React.useEffect(() => {
    toggleNavbarState();
    
    window.addEventListener('scroll', toggleNavbarState)
  }, [toggleNavbarState]);

// single navbar menu item
  const MenuItem = ({image, title, description, path}:menuItemProps) => {
    return (
      <Link to={path} className='w-[320px] h-[80px] rounded-md p-[11px] hover:bg-[#0073AD1A]' onClick={closeMenu}>
        <div className="h-full w-[272px] flex gap-6">
          <div className="size-[32px] flex-none">
            <img src={image} alt='icon' className='object-cover'/>
          </div>
          <div className="h-full ">
            <h2 className='font-semibold text-[14px] leading-[21px] '>{title}</h2>
            <p className='text-[12px] leading-[18px] font-light'>{description}</p>
          </div>
        </div>
      </Link>
    )
  };

  // full drop down menu that will hold the single values
  const DropDownMenu = ({menuList, style, isOpen}:dropDownMenuProps) => {
    return (
      <div className={cn('bg-bgSurface border rounded-lg z-10 px-3 py-5 flex-col gap-3 shadow-lg absolute',style, isOpen ? 'flex': 'hidden')}>
        {menuList.map((item:menuItemProps) => (
          <MenuItem key={item.title} {...item}/>
        ))}
      </div>
    )
  };

  // full drop down for menu list in grid
  const BigDropDownMenu = ({menuList, style, isOpen}:dropDownMenuProps) => {
    return (
      <div className={cn('bg-bgSurface border rounded-lg z-10 px-3 py-5 flex-col xl:grid-cols-2 gap-3 shadow-lg absolute xl:min-w-[676px]',style, isOpen ? 'flex xl:grid': 'hidden')}>
        {menuList.map((item:menuItemProps) => (
          <MenuItem key={item.title} {...item}/>
        ))}
      </div>
    )
  };

  return (
    <div className={navIsFixed}>
      <div className="mx-auto h-full px-[25px] xl:px-[95px] flex items-center justify-between font-poppins">
        
        {/* home page link */}
        <div className="flex items-center gap-4">
          <Menu size={25} className='xl:hidden cursor-pointer' onClick={() => setOpenMobile(!openMobile)}/>
          <Link to={'/about'}>
            <div className='w-[110px] xl:w-[153px] h-[34px] xl:h-[48px]'>
              <img src="../../../src/assets/images/olamax_logo_2.png" alt="logo" className='object-cover'/>
            </div>
          </Link>
        </div>

        {/* other links for desktop */}
        <ul className='hidden xl:flex items-center gap-8 cursor-pointer h-full'>
          <li className='flex items-center gap-2 h-full relative group' onClick={() => setOpenTrade(!openTrade)}>
            <span className='group-hover:text-primary'>Trade Crypto</span>
            <ChevronDown className='size-4 mt-1 group-hover:text-primary group-hover:rotate-180'/>
            <DropDownMenu 
              menuList={tradeCryptoList}
              style='left-0 top-[108px] hidden group-hover:flex'
              isOpen={openTrade}
          />
          </li>
          <li className='hover:text-primary'>
            <Link to={'/escrow-services'}>Escrow Services</Link>
          </li>
          <li className='hover:text-primary'>
            <Link to={'/escrow-services'}>OTC Desk</Link>
          </li>
          <li className='h-full flex items-center gap-2 relative group' onClick={() => setOpenSupport(!openSupport)}>
            <span className='group-hover:text-primary'>Support</span>
            <ChevronDown className='size-4 mt-1 group-hover:text-primary group-hover:rotate-180'/>
            <DropDownMenu 
              menuList={supportList}
              style='-left-[120px] top-[108px] hidden group-hover:flex'
              isOpen={openSupport}
            />
          </li>
          <li className='h-full flex items-center gap-2 relative group' onClick={() => setOpenMore(!openMore)}>
            <span className='group-hover:text-primary'>More</span>
            <ChevronDown className='size-4 mt-1 group-hover:text-primary group-hover:rotate-180'/>
            <BigDropDownMenu 
              menuList={moreList}
              style='-left-[450px] top-[108px] hidden group-hover:grid'
              isOpen={openMore}
            />
          </li>
        </ul>

        {/* other links for mobile */}
        {openMobile &&
          <div className={cn('w-full h-screen fixed top-0 left-0 bg-black/10 xl:hidden z-[4000] transition-all ease-in-out', openMobile ? '-right-0' : '-right-[100%]')}>
            <div className="w-[80%] bg-bgSurface h-full px-8">
              <div className="border-b w-full h-[96px] flex place-items-end pb-1">
                <div className="w-full flex items-center justify-between">
                  <h2 className='text-base leading-[24px]'>Menu</h2>
                  <X size={25} className='cursor-pointer' onClick={() =>setOpenMobile(false)}/>
                </div>
              </div>
              <ul className='flex flex-col gap-8 mt-8'>
                <li className='flex items-center gap-2 h-full relative group' onClick={() => setOpenTrade(!openTrade)}>
                  <span className='group-hover:text-primary'>Trade Crypto</span>
                  <ChevronDown className='size-4 mt-1 group-hover:text-primary group-hover:rotate-180'/>
                  <DropDownMenu 
                    menuList={tradeCryptoList}
                    style='-left-3 top-[30px] hidden group-hover:flex'
                    isOpen={openTrade}
                />
                </li>
                <li className='hover:text-primary'>
                  <Link to={'/escrow-services'}>Escrow Services</Link>
                </li>
                <li className='hover:text-primary'>
                  <Link to={'/escrow-services'}>OTC Desk</Link>
                </li>
                <li className='h-full flex items-center gap-2 relative group' onClick={() => setOpenSupport(!openSupport)}>
                  <span className='group-hover:text-primary'>Support</span>
                  <ChevronDown className='size-4 mt-1 group-hover:text-primary group-hover:rotate-180'/>
                  <DropDownMenu 
                    menuList={supportList}
                    style='-left-3 top-[30px] hidden group-hover:flex'
                    isOpen={openSupport}
                  />
                </li>
                <li className='h-full flex items-center gap-2 relative group' onClick={() => setOpenMore(!openMore)}>
                  <span className='group-hover:text-primary'>More</span>
                  <ChevronDown className='size-4 mt-1 group-hover:text-primary group-hover:rotate-180'/>
                  <BigDropDownMenu 
                    menuList={moreList}
                    style='-left-3 -top-[100px] hidden xl:group-hover:grid group-hover:flex'
                    isOpen={openMore}
                  />
                </li>
              </ul>
            </div>
          </div>
        }

        {/* auth buttons */}
        <div className='flex items-center gap-2'>
          <Button variant={'ghost'} className='font-semibold w-[80px] h-[38px] xl:w-[112px] xl:h-[54px] rounded-lg text-[13px] leading-[19.5px] xl:text-base xl:leading-[24px] text-primary hover:text-primary'>Sign In</Button>
          <Button className='font-semibold  w-[80px] h-[38px] xl:w-[112px] xl:h-[54px] rounded-lg text-[13px] leading-[19.5px] xl:text-base xl:leading-[24px]'>Sign Up</Button>
        </div>
      </div>
    </div>
  )
}

export default BottomHeader