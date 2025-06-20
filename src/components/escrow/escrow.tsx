import React from "react"
import rectangleescrow from '../../assets/images/Rectangleescrow.svg'
import btcEscrow from '../../assets/images/BitcoinEscrow.svg'
import alertescrow from '../../assets/images/alertescrow.svg'
import shieldCheck from '../../assets/images/shield-check.svg'
import trustbuild from '../../assets/images/trustBuild.svg'
import { useKYCConfirmationModal } from "../../lib/utils"
import useUserDetails from "../../stores/userStore"
import { useNavigate } from "react-router-dom"
 

const Escrow = () => {
    const navigate = useNavigate();
    const escrowBenefit = [
        {
            icon:shieldCheck,
            label:'Enhanced Security',
            description:'An escrow service holds funds in a secure account until all terms of a transaction are met. This protects both buyers and sellers, ensuring that funds are only released when both parties fulfill their obligations.'
        },
        {
            icon: alertescrow ,
            label:'Reduced Risk of Fraud',
            description:'By acting as a neutral third party, escrow services help prevent fraud. For example, in a crypto transaction, the buyer can be assured that their payment won’t be released until the seller has transferred the asset as agreed.'
        },
        {      
            icon:trustbuild,
            label:'Trust Building',
            description:'Escrow services foster trust, particularly in high-value or international transactions where both parties may be unfamiliar with each other. Knowing there’s a secure intermediary encourages more confident trading and investment decisions.'
        }
    ]
    const openKYCCONfirmation = useKYCConfirmationModal();
    const { user , token } = useUserDetails();
    const isVerified = user?.account_status;

    const EscrowButton = () => {
        if (user && token) {
            if (isVerified === 'verified') {
                window.open("https://wa.me/+2347074322020", "_blank");
            } else {
                openKYCCONfirmation.onOpen();
            }
            
        } else {
            navigate('/log-in');
        }
};
  return (
    <React.Fragment>
        <section className="p-5 xl:p-10 w-full h-auto">
            <div className="xl:flex items-center justify-between ">
                <div className="w-full xl:w-[50%] p-5">
                    <h2 className="font-DMSans font-bold text-[28px] lg:text-[32px] lg:leading-[48px] leading-[44px] text-[#121826] ">OLAMAX EXCHANGE </h2>
                   <h2  className="font-DMSans font-bold text-[28px] lg:text-[32px] lg:leading-[48px] leading-[44px] text-[#121826] "> <span  className="font-DMSans font-bold text-[28px] lg:text-[32px] lg:leading-[48px] leading-[44px] text-[#039AE4] ">Escrow</span> Service  </h2> 
                   <p className="font-Inter font-normal text-[14px] lg:text-[18px] leading-[26.6px] xl:leading-[30.6px]  text-[#000000]  ">  Service offers a secure and trusted solution for completing cryptocurrency transactions. Acting as a neutral third party, our escrow service holds funds until both buyer and seller meet all agreed terms.</p>
                   <button 
                   onClick={() => EscrowButton()}
                   className="mt-10 xl:w-[150px] w-[115px] h-[38px] rounded-sm text-[12px] leading-[19.5px] font-Inter xl:h-[54px] xl:rounded-[10px] px-[25px] py-[10px] xl:font-poppins xl:text-[16px] xl:leading-[24px] text-[#ffffff] bg-[#039AE4]">
                      Get Started
                    </button>
                </div>
                <div className="w-full h-auto xl:w-[50%] flex items-center justify-center ">
                    <img src={btcEscrow} alt="btc"/>
                </div>
            </div>

            <div className="xl:flex items-center justify-center h-auto w-full bg-[#121826]">
               <div  className="xl:w-[50%] w-full  h-auto  flex items-center justify-center " ><img src={rectangleescrow} alt="Otc" className="object-cover"  />  </div>

                    <div className="bg-[#121826] text-[#ffffff] w-full xl:w-[50%] ">
                        <h2 className="font-DMSans font-bold ml-5 mt-3 xl:mt-3 text-[28px] xl:text-[32px] leading-[44px] xl:leading-[48px]">Benefits of Escrow</h2>
                        <div className="p-5">
                            {escrowBenefit.map((escrow, index) => (
                                <div key={index} className="">
                                 <div className="flex items-center gap-3  mt-5">
                                     <div className="size-10 bg-white flex items-center justify-center rounded-full">
                                          <img src={escrow.icon}/>
                                      </div>
                                     <h3 className="font-Inter font-medium text-[16px] xl:text-[20px] leading-[24px] xl:leading-[28px] ">
                                              {escrow.label}
                                    </h3>
                                </div>   
                                    
                                    <div className="ml-12  ">
                                    <p className="font-normal font-Inter text-[14px] xl:text-[18px] leading-[22px] xl:leading-[26px]">
                                            {escrow.description}
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

export default Escrow