import React from 'react'
import { cn, timelineCreator, useOpenMobile, useOpenNotification } from '../../lib/utils';
import { HiCheckCircle, HiExclamationCircle, HiGift, HiShieldCheck } from 'react-icons/hi';
import { notificationList } from '../../assets/constants';
import { X } from 'lucide-react';

type notification = {
  title: string;
  content: string;
  alertType: string;
}

type notificationCardProps = {
  date: string;
  notifications: notification[]
}

const Notifications = () => {
  const { isOpen, onClose } = useOpenNotification();
  const openMobile = useOpenMobile();

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
  return (
    <React.Fragment>
      {isOpen &&
        <div className={cn('overflow-y-auto w-full h-full fixed top-0 left-0 bg-black/10 z-[4000] transition-all ease-in-out', openMobile.isOpen ? '-right-0' : '-right-[100%]')}>
          <div className="ml-auto lg:w-[540px] md:w-[440px] w-[80%] bg-bgSurface h-full lg:px-8 px-5">
            <div className="w-full h-[96px] flex place-items-end mb-4">
              <div className="w-full flex items-center justify-between">
                <h2 className='text-[24px] md:text-[32px] font-bold font-DMSans'>Notifications</h2>
                <X size={25} className='cursor-pointer' onClick={() =>onClose()}/>
              </div>
            </div>
            { notificationList.map((notification, index:number) => (
              <NotificationCard key={index} {...notification}/>
            ))}
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default Notifications