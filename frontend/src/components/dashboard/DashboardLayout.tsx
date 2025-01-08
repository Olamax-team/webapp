import React from 'react'
import { cn } from '../../lib/utils';
import { HiOutlineCash, HiOutlineClipboardList, HiOutlineIdentification, HiOutlineUserCircle, HiOutlineGift, HiOutlineChartPie } from "react-icons/hi"
import { IconType } from 'react-icons/lib';
import { Link, useLocation } from 'react-router-dom';

type dashboardLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

type dashboardNavLinkProps = {
  label: string;
  icon: IconType;
  path: string;
};

const navLinkList = [
  {
    label: 'Dasboard',
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
]

const DashboardLayout = ({children, className}:dashboardLayoutProps) => {

  const DashboardNavLink = ({label, icon:Icon, path}:dashboardNavLinkProps) => {
    const { pathname } = useLocation();

    return (
      <Link to={path} className={cn("w-[290px] h-[60px] rounded-r-[30px] pl-[49px] flex item-center hover:bg-[#f5f5f5] group", pathname === path ? 'bg-[#f5f5f5]' : '')}>
        <div className={cn('my-auto flex items-center gap-3 group-hover:text-primary', pathname === path ? 'text-primary': '')}>
          <Icon className='size-6'/>
          <p className='font-medium'>{label}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className={cn('w-full flex', className)}>
      <div className="w-[21%] sticky top-[100px] h-full py-10 font-poppins flex flex-col gap-8">
        { navLinkList.map((item) => (
          <DashboardNavLink {...item} key={item.path}/>
        ))}
      </div>
      <div className="w-[79%] bg-[#f5f5f5]">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout