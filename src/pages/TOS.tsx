
const TOS = () => {
    const tos = [
        {
            title: "ACCEPTANCE OF TERMS",
            descr: [ "By using Olamax Exchange, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as any additional policies referenced herein. If you do not agree, please refrain from using our services.",]
        },
        {
            title: "ELIGIBILITY",
            descr: ["To use our services, you must be at least 18 years old and comply with applicable Nigerian laws and regulations. We reserve the right to refuse service, suspend accounts, or terminate access if we suspect any violations of these Terms.",]
        },
        {
            title: "SERVICES PROVIDED",
            descr: [
                "Olamax Exchange offers the following services:",
                "Cryptocurrency Trading: Convert over 20 cryptocurrencies, including USDT, BTC, and ETH, to Nigerian Naira (NGN).",
               " Escrow Services: We provide secure escrow services for cryptocurrency transactions to protect buyers and sellers.",
                "Bills Payment: Users can make payments for select bills through the platform.",
                "Referral Program: We offer a referral program to users at our sole discretion, as described below"
            ],
        },
        {
            title: "USER RESPONSIBILITIES",
            descr: [
                "By using our services, you agree to: ",
                "Provide accurate information during registration and verification.",
                "Keep your account details confidential and secure.",
                "Use our services only for lawful purposes and in compliance with these Terms and Nigerian law.",
                "You acknowledge that cryptocurrency transactions carry risks, including market volatility, and that Olamax Exchange is not responsible for any financial loss arising from your trading activities on our platform.",
            ],
        },
        {
            title: "REFERRAL PROGRAM",
            descr: [
                "Our referral program is strictly at the discretion of Olamax Exchange. We reserve the right to grant referral bonuses solely to users we deem eligible, and we are not obligated to provide a referral bonus to any specific individual. Decisions regarding referral bonuses are final, and users agree that they are not entitled to question or dispute such decisions",
            ],
        },
        {
            title: "FOUNDATION DONATIONS",
            descr: [
                "Olamax Exchange’s foundation program accepts donations intended to support specific causes as communicated by us. All donations are non-refundable and will be directed exclusively toward the intended purpose. By donating, you agree that Olamax Exchange will manage the funds in accordance with its stated objectives, and no refunds or reversals will be issued.",
            ],
        },
        {
            title: "TRANSACTIONS AND SERVICE FEES",
            descr: [
                "Certain transactions and services provided by Olamax Exchange may incur fees. These fees are clearly outlined at the time of the transaction and are subject to change. By initiating a transaction, you agree to any associated fees, which are non-refundable once processed",
            ],
        },
        {
            title: "PRIVACY AND SECURITY",
            descr: [
                "Olamax Exchange is committed to protecting your personal information. Please refer to our Privacy Policy for details on how we collect, use, and protect your data. By using our services, you agree to our privacy practices as outlined in our Privacy Policy.",
            ],
        },
        {
            title: "PROHIBITED ACTIVITIES",
            descr: [
                "You agree not to engage in any activity that:",
                "Violates Nigerian law or regulations applicable to cryptocurrency.",
                "Compromises the security, stability, or functionality of Olamax Exchange.",
                "Attempts to fraudulently access, misuse, or disrupt the services provided by Olamax Exchange.",
                <br/>,
                "Violations of this section may result in account suspension, termination, and possible legal action.",
            ],
        },
        {
            title: "INTELLECTUAL PROPERTY",
            descr: [
                "All content, trademarks, and proprietary materials on Olamax Exchange are protected by intellectual property laws. Unauthorized use, reproduction, or distribution of any material on our platform is prohibited without prior written consent.",
            ],
        },
        {
            title: "LIMITATIONS OF LIABILITY",
            descr: [
                `Olamax Exchange provides its services "as-is" without any warranty or guarantee of accuracy, completeness, or reliability. We are not liable for any indirect, incidental, or consequential damages arising from:`,
                "Losses incurred due to cryptocurrency trading, exchange rate fluctuations, or service interruptions.",
                "Unauthorized access to your account or data.",
                "Any errors, omissions, or inaccuracies in the information provided on our platform.",
            ],
        },
        {
            title: "INDEMNIFICATION",
            descr: [
                "By using Olamax Exchange, you agree to indemnify, defend, and hold harmless Olamax Exchange, its affiliates, employees, and agents from and against any claims, liabilities, damages, and expenses (including legal fees) arising out of your violation of these Terms, applicable laws, or any third-party rights.",
            ],
        },
        {
            title: "CHANGES TO TERMS",
            descr: [
                "Olamax Exchange reserves the right to modify these Terms at any time. Any changes will be posted on this page, and significant updates will be communicated directly through the platform. Your continued use of our services following any updates constitutes your acceptance of the revised Terms.",
            ],
        },
        {
            title: "CONTACT US",
            descr: [
                "If you have any questions, concerns, or feedback regarding these Terms, please contact us at:",
                <br/>,
                "Olamax Exchange",
                "Email: info@olamax.io",
            ],
        },
    ]
  return (
    <div className='px-10 xl:px-32 py-10 space-y-10 bg-bg'>
      <div className='font-Inter space-y-[26px]'>
        <h1 className='mt-7 font-DMSans text-[29px] leading-[43.5px] font-bold text-center'>Terms of Service</h1>
        <p className='text-[18px] leading-[27px] font-normal'>Welcome to Olamax Exchange. By accessing or using our platform, you agree to abide by these Terms of Service ("Terms"). Please read them carefully as they govern your use of Olamax Exchange's services, including buying and selling cryptocurrency, escrow services, bills payment, and our referral and foundation programs.</p>
      </div>
      
      <div className='space-y-10'>
        {tos.map((item,index) => (
            <div
            key={index}
            className='font-Inter space-y-8'>
                <span><h1 className='font-DMSans text-[26px] leading-[px] font-bold'>{item.title}</h1></span>
                <ul className="mt-8 text-[18px] leading-[27px] font-normal">
                    {item.descr.map((desc,index) => (
                            <p key={index}>{desc}</p>
                    ))}
                </ul>
            </div>
        ))}
      </div>
      <p className='text-[18px] leading-[27px] font-normal'>Thank you for choosing Olamax Exchange. We are committed to providing secure, reliable services in the cryptocurrency space.</p>
    </div>
  )
}

export default TOS
