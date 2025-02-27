import React from 'react';
import { Bell, ChevronDown,Menu, X} from 'lucide-react';
import { Link } from 'react-router-dom'
import { Button } from '../ui/button';
import { cn, timelineCreator } from '../../lib/utils';
import ImageAvatar from '../ui/image-avatar';
import { HiCheckCircle, HiExclamationCircle, HiGift, HiShieldCheck } from "react-icons/hi2";
import { moreList, notificationList, supportList, tradeCryptoList } from '../../assets/constants';
import useUserDetails from '../../stores/userStore';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import axios from 'axios';

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

type bottomProps = {
  notifications: boolean;
}

type notification = {
  title: string;
  content: string;
  alertType: string;
}

type notificationCardProps = {
  date: string;
  notifications: notification[]
}


const BottomHeader = ({notifications}:bottomProps) => {

  const [openTrade, setOpenTrade] = React.useState(false);
  const [openSupport, setOpenSupport] = React.useState(false);
  const [openMore, setOpenMore] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);

  const { user, token , clearUser} = useUserDetails();

  // navbar styles for normal
  const navbar = 'bg-bgSurface w-full h-[64px] lg:h-[100px] shadow shadow-[4px_4px_4px_0_rgba(0, 0, 0, 0.3)]';

  // navbar styles for fixed 
  const navbarFixed = 'bg-bgSurface z-[4000] fixed w-full h-[64px] lg:h-[100px] -top-[100px] transform translate-y-[100px] transition-all ease-out duration-1000 shadow shadow-[4px_4px_4px_0_rgba(0, 0, 0, 0.3)]';

  const [navIsFixed, setNavIsFixed] = React.useState(navbar);

// for closing menu when links are clicked on
  const closeMenu = () => {
    if (openTrade) {
      setOpenTrade(false);
      setOpenSupport(false);
      setOpenMore(false);
      setOpenMobile(false);
    }

    if (openSupport) {
      setOpenSupport(false);
      setOpenTrade(false);
      setOpenMore(false);
      setOpenMobile(false);
    }

    if (openMore) {
      setOpenMore(false);
      setOpenSupport(false);
      setOpenTrade(false);
      setOpenMobile(false);
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
      <Link to={path} className='lg:w-[320px] lg:h-[80px] rounded-md p-[11px] hover:bg-[#0073AD1A] w-fit' onClick={closeMenu}>
        <div className="lg:h-full lg:w-[272px] w-[230px] flex lg:gap-6 gap-4 items-center lg:items-stretch">
          <div className="size-[32px] flex-none">
            <img src={image} alt='icon' className='object-cover'/>
          </div>
          <div className="lg:h-full h-auto">
            <h2 className='font-semibold text-[14px] leading-[21px] '>{title}</h2>
            <p className='text-[12px] leading-[18px] font-light hidden lg:block'>{description}</p>
          </div>
        </div>
      </Link>
    )
  };

  // full drop down menu that will hold the single values
  const DropDownMenu = ({menuList, style, isOpen}:dropDownMenuProps) => {
    return (
      <div className={cn('bg-bgSurface border rounded-lg z-10 px-3 py-5 flex-col gap-3 shadow-lg absolute',style, isOpen ? 'flex': 'hidden')}>
        {menuList === tradeCryptoList ? tradeCryptoList.map((item:menuItemProps) => (
          <MenuItem key={item.title} {...item} path={user ? item.path : '/log-in'}/>
        )) : menuList.map((item:menuItemProps) => ( 
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

  //function for selection of icon
  const iconSelector = (alertType:string) => {
    if (alertType === 'transaction-alert') {
      return <HiCheckCircle className='size-[16px] lg:size-[20px]'/>
    } else if (alertType === 'feature-update') {
      return <HiExclamationCircle className='size-[16px] lg:size-[20px]'/>
    } else if (alertType === 'security-update') {
      return <HiShieldCheck className='size-[16px] lg:size-[20px]'/>
    } else {
      return <HiGift className='size-[16px] lg:size-[20px]'/>
    }
  };

  // for each notification item
  const NotificationCard = ({date, notifications}:notificationCardProps) => {
    return (
      <div className='flex flex-col gap-3 font-Inter'>
        <h3 className='text-base mb-1 text-gray-500'>
          {timelineCreator(date)}
        </h3>
        {notifications.map((notification:notification, index:number) => (
          <div className='flex gap-4' key={index}>
            <div className="size-[40px] lg:size-[50px] rounded-full flex items-center justify-center bg-primary/20 text-primary flex-none">
              {iconSelector(notification.alertType)}
            </div>
            <div className='flex-1'>
              <div className='flex-1 flex flex-col gap-1'>
                <div className='flex items-center justify-between'>
                  <h2 className='font-Inter text-base lg:text-lg font-bold'>{notification.title}</h2>
                  <p className='text-[12px] leading-[19px] font-semibold text-gray-500'>1h</p>
                </div>
                <p className='text-[12px] leading-[19px]'>{notification.content}</p>
              </div>
            </div>
          </div>
          ))}
      </div>
    )
  };

  const signOut = () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.olamax.io/api/logout',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    clearUser();
    axios.request(config)
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        console.log('logged out')
      };
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching data message:", error.response?.data.message || error.message);        
      } else {
        console.error("Unexpected error:", error);
      };
    });
  };

  return (
    <div className={navIsFixed}>
      <div className="mx-auto h-full px-[15px] xl:px-[95px] flex items-center justify-between font-poppins">
        
        {/* home page link */}
        <div className="flex items-center gap-4">
          <Menu size={25} className='xl:hidden cursor-pointer' onClick={() => setOpenMobile(!openMobile)}/>
          <Link to={'/'}>
            <div className='w-[110px] xl:w-[153px] h-[34px] xl:h-[48px]'>
              <img src={'/images/olamax_logo_2.png'} alt="logo" className='object-cover'/>
            </div>
          </Link>
        </div>

        {/* other links for desktop */}
        <ul className='hidden xl:flex items-center gap-8 cursor-pointer h-full'>
        <li className='flex items-center gap-2 h-full relative group'>
          <button className={cn('group-hover:text-primary', openTrade ? 'text-primary' : '')} onClick={() => {setOpenTrade((prev) => !prev); setOpenSupport(false); setOpenMore(false);}}>
            Trade Crypto
          </button>
          <ChevronDown className={cn('size-4 mt-1 group-hover:text-primary group-hover:rotate-180', openTrade ? 'text-primary rotate-180': '')}/>
          <DropDownMenu 
            menuList={tradeCryptoList}
            style='left-0 top-[108px]'
            isOpen={openTrade}
          />
        </li>
          <li className='hover:text-primary'>
            <Link to={'/escrow-services'}>Escrow Services</Link>
          </li>
          <li className='hover:text-primary'>
            <Link to={'/escrow-services'}>OTC Desk</Link>
          </li>
          <li className='h-full flex items-center gap-2 relative group' onClick={() => {setOpenSupport(!openSupport); setOpenMore(false); setOpenTrade(false);}}>
            <span className={cn('group-hover:text-primary', openSupport ? 'text-primary' : '')}>Support</span>
            <ChevronDown className={cn('size-4 mt-1 group-hover:text-primary group-hover:rotate-180', openSupport ? 'text-primary rotate-180': '')}/>
            <DropDownMenu 
              menuList={supportList}
              style='-left-[120px] top-[108px]'
              isOpen={openSupport}
            />
          </li>
          <li className='h-full flex items-center gap-2 relative group' onClick={() => {setOpenMore(!openMore); setOpenTrade(false); setOpenSupport(false);}}>
            <span className={cn('group-hover:text-primary', openMore ? 'text-primary' : '')}>More</span>
            <ChevronDown className={cn('size-4 mt-1 group-hover:text-primary group-hover:rotate-180', openMore ? 'text-primary rotate-180': '')}/>
            <BigDropDownMenu 
              menuList={moreList}
              style='-left-[450px] top-[108px]'
              isOpen={openMore}
            />
          </li>
        </ul>

        {/* other links for mobile */}
        {openMobile &&
          <div className={cn('w-full h-screen fixed top-0 left-0 bg-black/10 xl:hidden z-[40000] transition-all ease-in-out', openMobile ? '-right-0' : '-right-[100%]')}>
            <div className="w-[80%] bg-bgSurface h-full px-8">
              <div className="border-b w-full h-[96px] flex place-items-end pb-1">
                <div className="w-full flex items-center justify-between">
                  <h2 className='text-base leading-[24px]'>Menu</h2>
                  <X size={25} className='cursor-pointer' onClick={() =>setOpenMobile(false)}/>
                </div>
              </div>
              <ul className='flex flex-col gap-8 mt-8'>
                <li className='flex items-center gap-2 h-full relative group' onClick={() => {setOpenTrade((prev) => !prev); setOpenSupport(false); setOpenMore(false);}}>
                  <span className={cn('group-hover:text-primary', openTrade ? 'text-primary' : '')}>Trade Crypto</span>
                  <ChevronDown className={cn('size-4 mt-1 group-hover:text-primary group-hover:rotate-180', openTrade ? 'text-primary rotate-180': '')}/>
                  <DropDownMenu 
                    menuList={tradeCryptoList}
                    style='-left-3 lg:top-[30px] top-10'
                    isOpen={openTrade}
                  />
                </li>
                <li className='hover:text-primary'>
                  <Link to={'/escrow-services'}>Escrow Services</Link>
                </li>
                <li className='hover:text-primary'>
                  <Link to={'/escrow-services'}>OTC Desk</Link>
                </li>
                <li className='h-full flex items-center gap-2 relative group' onClick={() => {setOpenSupport(!openSupport); setOpenMore(false); setOpenTrade(false);}}>
                  <span className={cn('group-hover:text-primary', openSupport ? 'text-primary' : '')}>Support</span>
                  <ChevronDown className={cn('size-4 mt-1 group-hover:text-primary group-hover:rotate-180', openSupport ? 'text-primary rotate-180': '')}/>
                  <DropDownMenu 
                    menuList={supportList}
                    style='-left-3 lg:top-[30px] top-10'
                    isOpen={openSupport}
                  />
                </li>
                <li className='h-full flex items-center gap-2 relative group' onClick={() => {setOpenMore(!openMore); setOpenTrade(false); setOpenSupport(false);}}>
                  <span className={cn('group-hover:text-primary', openMore ? 'text-primary' : '')}>More</span>
                  <ChevronDown className={cn('size-4 mt-1 group-hover:text-primary group-hover:rotate-180', openMore ? 'text-primary rotate-180': '')}/>
                  <BigDropDownMenu 
                    menuList={moreList}
                    style='-left-3 lg:-top-[100px] top-10'
                    isOpen={openMore}
                  />
                </li>
              </ul>
            </div>
          </div>
        }

        {/* notifications */}
        {openNotification &&
          <div className={cn('overflow-y-auto w-full h-screen fixed top-0 left-0 bg-black/10 z-[4000] transition-all ease-in-out', openMobile ? '-right-0' : '-right-[100%]')}>
            <div className="ml-auto lg:w-[540px] md:w-[440px] w-[80%] bg-bgSurface h-full lg:px-8 px-5">
              <div className="w-full h-[96px] flex place-items-end mb-4">
                <div className="w-full flex items-center justify-between">
                  <h2 className='text-[24px] md:text-[32px] font-bold font-DMSans'>Notifications</h2>
                  <X size={25} className='cursor-pointer' onClick={() =>setOpenNotification(false)}/>
                </div>
              </div>
              { notificationList.map((notification, index:number) => (
                <NotificationCard key={index} {...notification}/>
              ))}
            </div>
          </div>
        }

        {/* if user is logged in he will see either his notifications and profile picture else login and sign in */}
        { user ? 
          (
            <div className='flex items-center gap-4'>
              <Link to={'/dashboard'}>
                <span className='text-primary text-sm md:text-base'>My Account</span>
              </Link>
              <button className='size-[32px] md:size-[40px] bg-bg rounded-full flex items-center justify-center' onClick={() =>setOpenNotification(!openNotification)}>
                <div className='size-[20px] flex items-center justify-center relative'>
                  <Bell className='size-4 md:size-7'/>
                  {notifications && <div className="absolute bg-primary size-[9px] rounded-full top-0 right-[2px]" />}
                </div>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className='cursor-pointer'>
                  <ImageAvatar style='md:size-[56px] size-[40px]' image={'/images/avatar_1.png'}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit z-[500] mr-4 lg:mr-0">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button type="button" onClick={signOut}>Log Out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : 
          (
            <div className='flex items-center gap-2'>
              <Button variant={'ghost'} className='font-semibold w-[80px] h-[38px] xl:w-[112px] xl:h-[54px] rounded-lg text-[13px] leading-[19.5px] xl:text-base xl:leading-[24px] md:text-primary md:hover:text-primary bg-primary text-white hover:text-white md:bg-white'>
                <Link to={'/log-in'}>Sign In</Link>
              </Button>
              <Button className='font-semibold bg-primary hover:bg-secondary w-[80px] h-[38px] xl:w-[112px] xl:h-[54px] rounded-lg text-[13px] leading-[19.5px] xl:text-base xl:leading-[24px] hidden md:block'>
                <Link to={'/sign-up'}>Sign Up</Link>
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default BottomHeader;