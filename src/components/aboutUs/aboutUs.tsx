
import React from "react";
import TopHeader from "../footer/TopHeader";
import OurValues from "./ourValues";
import { documentTitle } from "../../lib/utils";
import imageA from '../../assets/images/imageA.svg'
import imageB from '../../assets/images/imageB.svg'
import imageC from '../../assets/images/imagec.svg'


const AboutUs = () => {
  documentTitle('About Us');

  const cryptoData = [
    { value: '1 Million +' , label: 'Users have an account with us.' },
    { value: '5', label: 'Countries available in' },
    { value: '$3 Million +', label: 'Crypto delivered' },
    { value: '22+', label: 'Crypto assets' },
  ];

  
  return (
    <React.Fragment>
      <section className="w-full h-auto p-4 lg:p-10 flex items-center justify-center flex-col text-center ">
          <div className="lg:w-[60%] w-full text-center ">
              <h2 className="font-Inter font-bold text-[18px] leading-[27px] text-center text-[#121826] xl:font-DMSans xl:font-bold xl:text-[32px] xl:leading-[48px] ">We see no reason why buying & selling crypto should be so hard</h2>
              <p className="mt-5 font-Inter font-medium  text-[14px] text-center  text-[#121826] leading-[21px] xl:font-Inter xl:font-medium xl:leading-[27px] xl:text-[18px]"> 
                OLAMAX EXCHANGE is a financial technology company that builds payments infrastructure for crypto. Our on-and-off-ramp suite of products provides a seamless experience for converting between fiat currencies and cryptocurrencies using all major payment methods including debit and credit card and local bank transfers. </p>
              <p className="mt-4 text-center font-Inter text-[14px]  text-[#121826] font-medium  xl:text-[18px] xl:leading-[27px] "> We are active in more than 5 countries and is trusted by over a million + users</p> 
            
              <div className="relative h-auto w-full mt-10 xl:p-5 text-center flex justify-center "> 
                  <div className="flex  items-center justify-center xl:w-full xl:h-auto h-[105px] w-[308px] relative  ">
                    <img src= {imageA} alt="" className="object-cover w-[95px] h-[76px] xl:w-[225px] xl:h-[120px] z-[1]" />
                    <img src= {imageB} alt="" className="object-cover w-[95px] h-[76px] xl:w-[225px] xl:h-[120px] z-[1]" />
                    <img src= {imageC} alt="" className="object-cover w-[95px] h-[76px] xl:w-[225px] xl:h-[120px] z-[1]" />
                    <h1 className="text-white font-bold xl:font-DMSans text-[70px] xl:text-[165px]  absolute text-center uppercase leading-10 xl:leading-[14] z-[2] after:content-['OLAMAX'] after:absolute after:w-full after:h-full  after:left-0 after:top-0  ">
                      OLAMAX
                    </h1>
                  </div>
                </div>  
                        
           
          </div>

          <div>
            <div className=" lg:flex  justify-between  w-full h-auto  mt-10 gap-10 ">
                  <h2 className="xl:w-[50%]  w-full font-DMSans font-bold text-[18px] leading-[27px] xl:text-left  text-center px-3">At <span className="text-[#039AE4] font-DMSans font-bold text-[18px] leading-[27px] items-center ">OLAMAX EXCHANGE</span>, we are the place where people reach their goals with cryptocurrencies and blockchain technology. 
                  We do that by offering a full scope of secure solutions to buy, sell, and earn digital assets. </h2>
                  <p className="xl:w-[50%]  w-full mt-10 xl:mt-0 font-Inter font-medium text-[14px] xl:text-left leading-[21px] text-center px-3 ">Olamax.io is a product of Olamax associate  incorporated in Nigeria. We provide Cryptocurrency to Fiat exchange services for Bitcoin, Ethereum, Doge, Steem and Sbd to NAIRA. Our exchange provides you a marketplace
                    where you can buy and sell Cryptocurrencies easily and safely with notable simple UI, friendly online customer support 24/7 and lowest 
                    fees at the best rate you can't find anywhere else.
                    Our team comprises of professionals with extensive experience in financial products, E-currencies, 
                    Payment Systems, Agile Software Development and others. If you'd like to get in touch with us, you can contact us at 
                  <span> <a href="mailto: info@olamax.io."> info@olamax.io.</a></span> For existing users requiring support and having specific questions about the platform, 
                    you can contact us at <span><a href="mailto:support@olamax.io" className="cursor-pointer">support@olamax.io</a></span>

                      Visit our steemit page 
                      <span className=" font-Inter font-medium text-[14px] leading-[21px] text-[#039AE4]">@olamax</span> </p>
            </div>

              <div className="flex items-center xl:mt-10 justify-center mt-10">
                  <div className="xl:flex justify-between items-center  xl:w-[65%] bg-[#121826] h-auto xl:h-[150px] rounded-[20px] w-full p-4 flex-wrap text-[#ffffff]">
                  {cryptoData.map((item, index) => (
                    <p className="mt-5 " key={index}>
                      <h5 className="font-semibold font-inter xl:text-[23px] xl:leading-[34.5px text-white] text-[18px] leading-[27px] ">{item.value}</h5>
                      <p className="font-medium font-inter xl:text-[16px] leading-[21px]  text-[14px]  xl:leading-[24px]">{item.label}</p>
                    </p>
                  ))}
                </div>
              </div>
          </div>

          <div> <OurValues/> </div>
      </section>
      <TopHeader/>
    </React.Fragment>
  )
}

export default AboutUs