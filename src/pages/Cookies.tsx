const Cookies = () => {
  return (
    <div  className="px-10 xl:px-32 py-10 space-y-10 bg-bg">
      <div className='font-Inter space-y-[26px]'>
        <h1 className='font-DMSans text-[29px] leading-[43.5px] font-bold text-center'>Cookies</h1>
        <p className='text-[18px] leading-[27px] font-normal'>
            At OLAMAX EXCHANGE, we value the privacy of our visitors and customers. We also know that people are concerned about how their online activity can be monitored, and what information is shared with other companies.
            <br/>One of the most common ways websites track and save information about their visitors is through the use of cookies. A cookie is a small file of text, often encrypted for privacy, that is used to store information between visits to a website. Modern internet browsers allow you to see what cookies are currently stored on your computer, and selectively delete them as you wish.
            <br/>We use cookies to keep track of your current shopping session so that you may retrieve your shopping basket at any time, and to personalise the contents our website as well as to ensure a consistent experience. We also use cookies to track how visitors interact with our website to monitor how we are performing. No personally identifiable information is stored in these cookies.
            <br/><br/>
            Please contact us if you have any questions about our Privacy Policy.
        </p>
      </div>
      {/* Google Analytics */}
      <div className='font-Inter space-y-[26px]'>
        <h1 className='font-DMSans text-[29px] leading-[43.5px] font-bold text-left'>GOOGLE ANALYTICS</h1>
        <p className='text-[18px] leading-[27px] font-normal'>
            Google Analytics is a commonly used online tool that allows OLAMAX EXCHANGE to see how well we are doing when helping people shop online. It records information including how you reached the OLAMAX EXCHANGE site, the city and county that you're browsing from, and what browser you are using. We can then see how people used the OLAMAX EXCHANGE website to purchase from us. Google Analytics is invaluable in helping us improve our service. We never pass any personally identifiable information over to Google.
            <br/>The Google Analytics cookies are named __utma, __utmb, __utmc, __utmli and __utmz
        </p>
      </div>

    </div>
  )
}

export default Cookies
