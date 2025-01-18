import React from 'react'
import { cn } from '../../lib/utils';
import { HiOutlineCash, HiOutlineClipboardList, HiOutlineIdentification, HiOutlineUserCircle, HiOutlineGift, HiOutlineChartPie } from "react-icons/hi"
import { IconType } from 'react-icons/lib';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

type dashboardLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

type dashboardNavLinkProps = {
  label?: string;
  icon?: IconType;
  path?: string;
};

type dashboardNavPlaceHolderProps = {
  label?: string;
  icon?: IconType;
};

const navLinkList = [
  {
    label: 'Dashboard',
    icon: HiOutlineChartPie,
    path: '/dashboard'
  },
  {
    label: 'Bills & Payment',
    icon: HiOutlineCash,
    path: '/dashboard/bills_payment'
  },
  {
    label: 'Transaction',
    icon: HiOutlineClipboardList,
    path: '/dashboard/transaction'
  },
  {
    label: 'Identity Verification',
    icon: HiOutlineIdentification,
    path: '/dashboard/identity_verification'
  },
  {
    label: 'Account Management',
    icon: HiOutlineUserCircle,
    path: '/dashboard/account_management'
  },
  {
    label: 'My Rewards',
    icon: HiOutlineGift,
    path: '/dashboard/my_rewards'
  }
];

const DashboardLayout = ({children, className}:dashboardLayoutProps) => {

    const navbar = "bg-white w-full md:hidden fixed top-[96px] z-[400]"
    const navbarFixed = "bg-white w-full md:hidden fixed top-[64px] z-[400]"

    const [showMenu, setShowMenu] = React.useState(false);

    const [navIsFixed, setNavIsFixed] = React.useState(navbar);

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

    const { pathname } = useLocation();

   const DashboardNavLink = ({label, icon:Icon, path}:dashboardNavLinkProps) => {
    
    return (
      <Link to={path ? path : ''} className={cn("md:w-[250px] lg:w-[280px] xl:w-[290px] h-[60px] rounded-r-[30px] pl-[20px] lg:pl-[40px] xl:pl-[49px] flex item-center hover:bg-[#f5f5f5] group", pathname === path ? 'bg-[#f5f5f5]' : '')}>
        <div className={cn('my-auto flex items-center gap-3 group-hover:text-primary', pathname === path ? 'text-primary': '')}>
          {Icon && <Icon className='size-6'/>}
          <p className='font-medium'>{label && label}</p>
        </div>
      </Link>
    );
  };

  const MobileNavLink = ({label, icon:Icon, path}:dashboardNavLinkProps) => {
    
    return (
      <Link to={path ? path : ''} className='flex gap-3 items-center group'>
        {Icon && <Icon className={cn('size-6 group-hover:text-primary', path === pathname ? 'text-primary' : '')}/>}
        <p className={cn('font-medium group-hover:text-primary', path === pathname ? 'text-primary' : '')}>{label}</p>    
      </Link>
    );
  };

  const PlaceHolder = ({label, icon:Icon}:dashboardNavPlaceHolderProps) => {

    return (
      <button className="flex items-center justify-between w-full font-poppins text-primary cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
        <div className='flex gap-3 items-center group'>
          {Icon && <Icon className={cn('size-6')}/>}
          <p className={cn('font-medium')}>{label && label}</p>    
        </div>
        { showMenu ? <ChevronDown/> : <ChevronUp/> }
      </button>
    )
  }

  return (
    <div className={cn('w-full flex md:flex-row flex-col', className)}>
      <div className="w-[33%] lg:w-[25%] xl:w-[22%] sticky md:top-[100px] h-full py-10 font-poppins hidden md:flex flex-col gap-8">
        { navLinkList.map((item) => (
          <DashboardNavLink {...item} key={item.path}/>
        ))}
      </div>
      <div className={navIsFixed}>
        <div className='h-[68px] flex items-center px-6 justify-between shadow shadow-[4px_4px_4px_0_rgba(0, 0, 0, 0.3)] border-t-2'>
          <div className="flex gap-3 items-center w-full">
            <PlaceHolder {...navLinkList.find(item => item.path === pathname)}/>
          </div>
        </div>
        {showMenu &&
          <div className='cursor-pointer absolute left-0 top-[68px] w-full p-6 border-t-2 bg-white gap-6 flex flex-col font-poppins shadow shadow-[4px_4px_4px_0_rgba(0, 0, 0, 0.3)]'>
            {navLinkList.map((item, index:number) => (
              <MobileNavLink {...item} key={index}/>
            ))}
          </div>
        }
      </div>
      <div className="w-full md:w-[67%] lg:w-[75%] xl:w-[78%] bg-[#f5f5f5] pt-[64px] md:pt-0 ">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout