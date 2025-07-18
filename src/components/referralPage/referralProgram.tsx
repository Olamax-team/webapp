import React, { useState } from 'react';
import refer from '../../assets/images/refer.svg';
import TopHeader from '../footer/TopHeader';
import sharelink from '../../assets/images/sharelink.svg';
import reward from '../../assets/images/reward.svg';
import invite from '../../assets/images/invite.svg';
import callCenter from '../../assets/images/callsCenter.svg';
import { ChevronDown, ChevronUp } from 'lucide-react';
import strokeleft from '../../assets/images/strokesLeft.svg'
import strokeright from '../../assets/images/strokesRight.svg'
import useUserDetails from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { documentTitle } from '../../lib/utils';

export const ReferralPrograme = () => {
    documentTitle('Referral Program')
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const { user, token } = useUserDetails();
    const navigate = useNavigate();

    const ReferralSteps = [
        {
            icon: sharelink,
            label: 'Share Your Link',
            description: 'Copy your unique referral link from your dashboard and share it with friends, family, and colleagues'
        },
        {
            icon: invite,
            label: 'Invite & Earn',
            description: 'When they sign up using your link and complete their first transaction, you earn a bonus.'
        },
        {
            icon: reward,
            label: 'Track Your Rewards',
            description: 'Keep an eye on your referral earnings directly from your dashboard. The more you refer, the more you earn!'
        }
    ];

    return (
        <React.Fragment>
            <section className='bg-[#f5f5f5f5]'>
            <div className='flex items-center justify-center flex-col lg:p-10'>
                <div className='w-full justify-between lg:flex '>
                    <div className='xl:w-[50%] text-center xl:text-left p-5  '>
                        <h2 className='text-[#121826] font-bold font-DMSans lg:text-[32px] text-[28px] lg:leading-[48px] leading-[44px]'>
                            Refer Friends to <span className='font-bold font-DMSans lg:text-[32px] text-[28px] lg:leading-[48px] leading-[44px] text-[#039AE4]'>OLAMAX</span> and Earn Exclusive Rewards
                        </h2>
                        <p className='mt-3 text-[#000000] font-Inter font-medium lg:text-[18px] text-[14px] lg:leading-[30.6px] leading-[24px]'>
                            Invite friends to experience the Olamax advantage in crypto trading, and earn rewards each time they trade. Share the benefits, help others join a secure platform, and enjoy bonuses that grow with every successful referral!
                        </p>

                        <button className="mt-10 xl:w-[150px] w-[115px] h-[38px] rounded-sm text-[12px] leading-[19.5px] font-Inter xl:h-[54px] xl:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]" onClick={() => {
                            if (!user || !token) {
                                navigate('/log-in');
                                
                            }
                        }}>
                            Get Started
                        </button >
                    </div>
                    <div className='xl:w-[50%] flex items-center justify-center'>
                        <img src={refer} className='w-[400px] h-[400px]' />
                    </div>
                </div>
            </div>

            <div className='bg-[#039AE4] flex flex-col justify-center items-center w-full h-auto'>
                <h2 className='mt-5 text-[#121826] font-bold font-DMSans lg:text-[32px] text-[28px] lg:leading-[48px] leading-[44px]' >
                    How to Invite
                </h2>
                <div className='grid grid-cols-1  lg:grid-cols-3   p-5 lg:p-10  gap-5'>
                    {ReferralSteps.map((refer, index) => (
                        <div key={index} className='  w-full h-auto rounded-[20px] bg-white flex flex-col items-center justify-center p-5 shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <div className='mt-5 bg-[#039AE433] size-10 rounded-full flex items-center justify-center'>
                                <img src={refer.icon} className='size-6 object-contain' />
                            </div>
                            <h2 className='mt-5 text-[#121826] font-Inter font-bold text-[16px] lg:text-[18px] md:text-[20px] text-center'>
                                {refer.label}
                            </h2>
                            <p className='mt-3 mb-5 font-Inter text-[#000000] text-[14px] sm:text-[16px] xl:text-[18px] text-center'>
                                {refer.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-5  lg:mt-0 lg:p-10 p-5 w-full h-auto '>
                <h2 className=' text-[#000000] font-bold font-DMSans lg:text-[32px] text-[28px] lg:leading-[48px] leading-[44px]'>
                    Frequently Asked Questions
                </h2>
                <div className='lg:flex justify-between  '>
                    <div className='xl:w-[50%]'>
                        <div>
                            <div className='flex items-center cursor-pointer' onClick={() => toggleQuestion(0)}>
                                <h2 className=' text-[#000000] font-bold font-DMSans lg:text-[18px] text-[14px] lg:leading-[27px] leading-[23px]'>
                                    How does the Olamax referral program work?
                                </h2>
                                {openQuestion === 0 ? <ChevronUp className='size-6  mt-3' /> : <ChevronDown className='size-6 mt-3' />}
                            </div>
                            {openQuestion === 0 && (
                                <p className='font-normal mt-5 font-Inter text-[14px] lg:text[18px] leading-[23px] lg:leading-[27px] text-[#121826]'>
                                    To get started with OLAMAX EXCHANGE, simply go to our website or app, click “Sign Up,” enter your email, create a secure password, and agree to our terms of service. After registering, check your email inbox for a confirmation link to verify your account. Once verified, log in to complete any additional profile information, and you&apos;re all set to start exploring the platform.
                                </p>
                            )}
                        </div>

                        <div className='flex items-center cursor-pointer' onClick={() => toggleQuestion(1)}>
                            <h2 className='mt-5 text-[#000000] font-bold font-DMSans lg:text-[18px] text-[14px] lg:leading-[27px] leading-[23px]'>
                                How to Complete Identity Verification?
                            </h2>
                            {openQuestion === 1 ? <ChevronUp className='size-6 mt-3' /> : <ChevronDown className='size-6 mt-3' />}
                        </div>
                        {openQuestion === 1 && (
                            <p className='font-normal mt-5 font-Inter text-[14px] lg:text[18px] leading-[23px] lg:leading-[27px] text-[#121826]'>
                                Follow the steps on the platform to complete identity verification for added security. This ensures that you can use all of the platform&apos;s features.
                            </p>
                        )}

                        <div className='flex items-center cursor-pointer' onClick={() => toggleQuestion(2)}>
                            <h2 className='mt-5 text-[#000000] font-bold font-DMSans lg:text-[18px] text-[14px] lg:leading-[27px] leading-[23px]'>
                                How to Trade on OLAMAX EXCHANGE?
                            </h2>
                            {openQuestion === 2 ? <ChevronUp className='size-6 mt-3' /> : <ChevronDown className='size-6 mt-3' />}
                        </div>
                        {openQuestion === 2 && (
                            <p className='font-normal mt-5 font-Inter text-[14px] lg:text[18px] leading-[23px] lg:leading-[27px] text-[#121826]'>
                                To trade on OLAMAX EXCHANGE, log into your account, select the trading pairs, and execute your trades. It&apos;s fast, simple, and secure.
                            </p>
                        )}
                    </div>

                    <div className='xl:w-[50%] flex items-center justify-center'>
                        <img src={callCenter} alt='' className='w-[400px] h-[400px]' />
                    </div>
                </div>
            </div>

            <div className='   flex items-center justify-center p-5 lg:p-10' > 
                <div className='  w-full h-auto  bg-[#FFFFFF] shadow-md flex items-center justify-center flex-col' >
                    <h2 className='font-DMSans font-bold text-[28px] lg:text-[32px] leading-[44px] lg:leading-[48px] p-5'>Can't find what you are looking for?</h2>
                    <button className="mt-10 mb-5 xl:w-[150px] w-[115px] h-[38px] rounded-sm text-[12px] leading-[19.5px] font-Inter xl:h-[54px] xl:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]">
                            Contact Us
                    </button>

                    <div className='hidden w-full lg:flex items-center justify-between'>
                        <img src={strokeleft} alt='' />
                        <img src={strokeright} alt='' />

                    </div>
                    
                </div>
               
            </div>

            <TopHeader />
            </section>
        </React.Fragment>
    );
};
