import React, { useEffect, useRef } from "react"
import { useOTCModal } from "../../lib/utils";
// import rectangleOTC from '../../assets/images/RectangleOTC.svg'
// import btcOTC from '../../assets/images/BitcoinOTC.svg'
// import alertOTC from '../../assets/images/alertOTC.svg'
// import shieldCheck from '../../assets/images/shield-check.svg'
// import trustbuild from '../../assets/images/trustBuild.svg'
 

const OTC = () => {
    const OTCBenefit = [
        {
            icon:'/images/shield-check.svg',
            label:'Privacy and Anonymity',
            description:'We offers a seamless and secure OTC (Over-the-Counter) service for large-volume crypto trades. Whether you’re an individual or institution, our OTC service ensures competitive rates, privacy, and personalized support from start to finish.'
        },
        {
            icon: '/images/cash.svg' ,
            label:'Better Pricing and Flexibility',
            description:'OTC trading offers more flexibility with rates and currency pairs, especially for large trades or transactions involving lesser-known assets. Pricing in OTC trades can often be more competitive as it allows for direct negotiations with the buyer or seller.'
        },
        {      
            icon:'/images/Vector.svg',
            label:'Personalized Service',
            description:'OTC desks offer a more tailored service for large traders, typically involving dedicated account managers or brokers who help facilitate the trade, ensuring smooth, reliable, and secure transactions.'
        }
    ]

    const hasOpenedRef = useRef(false);
    const openOTCModal = useOTCModal();

    useEffect(() => {
        if ( !hasOpenedRef.current) {
        openOTCModal.onOpen();
        hasOpenedRef.current = true; 
        }
    }, [openOTCModal]);
  return (
    <React.Fragment>
        <section className="p-5 xl:p-10 w-full h-auto">
            <div className="xl:flex items-center justify-between ">
                <div className="w-full xl:w-[50%] p-5">
                    <h2 className="font-DMSans font-bold text-[28px] lg:text-[32px] lg:leading-[48px] leading-[44px] text-[#121826] ">OLAMAX EXCHANGE <span  className="font-DMSans font-bold text-[28px] lg:text-[32px] lg:leading-[48px] leading-[44px] text-[#039AE4] ">OTC</span> <br/> & Execution Service  </h2>
                   <p className="font-Inter font-normal text-[14px] lg:text-[18px] leading-[26.6px] xl:leading-[30.6px]  text-[#000000]">  Eligible for exclusive high-volume transactions—starting at $50,000 for USDT & USDC or 2 BTC for Bitcoin—the Olamax OTC Desk provides top market rates, rapid transaction processing, and dedicated support to streamline every step of your bulk crypto trades.</p>
                   <button className="mt-10 xl:w-[150px] w-[115px] h-[38px] rounded-sm text-[12px] leading-[19.5px] font-Inter xl:h-[54px] xl:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]">
                      Get Started
                    </button>
                </div>
                <div className="w-full h-auto xl:w-[50%] flex items-center justify-center ">
                    <img src="/images/OTC.svg" alt="btc"/>
                </div>
            </div>

            <div className="xl:flex items-center justify-center h-auto w-full bg-[#121826]">
               <div  className="xl:w-[50%] w-full  h-auto  flex items-center justify-center " ><img src="/images/RectangleOTC.svg" alt="Otc" className="object-cover"  />  </div>

                    <div className="bg-[#121826] text-[#ffffff] w-full xl:w-[50%] ">
                        <h2 className="font-DMSans font-bold ml-5 mt-3 xl:mt-3 text-[28px] xl:text-[32px] leading-[44px] xl:leading-[48px]">Benefits of OTC</h2>
                        <div className="p-5">
                            {OTCBenefit.map((OTC, index) => (
                                <div key={index} className="">
                                 <div className="flex items-center gap-3  mt-5">
                                     <div className="size-10 bg-white flex items-center justify-center rounded-full">
                                          <img src={OTC.icon}/>
                                      </div>
                                     <h3 className="font-Inter font-medium text-[16px] xl:text-[20px] leading-[24px] xl:leading-[28px] ">
                                              {OTC.label}
                                    </h3>
                                </div>   
                                    
                                    <div className="ml-12  ">
                                    <p className="font-normal font-Inter text-[14px] xl:text-[18px] leading-[22px] xl:leading-[26px]">
                                            {OTC.description}
                                        </p>
                                    </div>

                                      
                                </div>
                            ))}
                        </div>
                    </div>
            </div>


        </section>
    </React.Fragment>
  )
}

export default OTC