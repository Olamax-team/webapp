// import news1 from "../../assets/images/news1.svg"
// import news2 from "../../assets/images/news2.svg"
// import news3 from "../../assets/images/news3.svg"


interface News {
    id: number;
    title: string;
    description:string;
    imageUrl: string;
    date: string;
  }
  // Define the type for the component props
  interface NewsProps {
      contentClassName?: string;
    }
const News: React.FC<NewsProps> = ({

}) => {

    const news: News[] = [
        {
            id: 1,
            title: "Olamax Launches New Escrow Service for Secure Transactions",
            description: "To enhance trust in peer-to-peer transactions, Olamax now offers a fully integrated escrow service, ensuring that funds are securely held until both parties complete their exchange, boosting security for users.",
            imageUrl: '/images/news1.svg',
            date: "Apr. 12, 2024",
        },
        {
            id: 2,
            title: "Olamax Now Supports Over 20 Cryptocurrencies, Expanding Your Options",
            description: "Olamax is excited to announce the addition of several new digital assets, providing users with even more options for converting cryptocurrencies into Naira and making cross-border payments easier than ever.",
            imageUrl: '/images/news2.svg',
            date: "Apr. 12, 2024",
        },
        {
            id: 3,
            title: "Olamax Partners with Top Nigerian Banks to Streamline Crypto-to-Naira Conversions",
            description: "Through new partnerships with leading Nigerian banks, Olamax has enhanced its crypto conversion process, enabling faster settlements and ensuring a more seamless experience for users.",
            imageUrl: '/images/news3.svg',
            date: "Apr. 12, 2024",
        },
        {
            id: 4,
            title: "Olamax Launches New Escrow Service for Secure Transactions",
            description: "To enhance trust in peer-to-peer transactions, Olamax now offers a fully integrated escrow service, ensuring that funds are securely held until both parties complete their exchange, boosting security for users.",
            imageUrl: '/images/news1.svg',
            date: "Apr. 12, 2024",
        },
          {
            id: 5,
            title: "Olamax Now Supports Over 20 Cryptocurrencies, Expanding Your Options",
            description: "Olamax is excited to announce the addition of several new digital assets, providing users with even more options for converting cryptocurrencies into Naira and making cross-border payments easier than ever.",
            imageUrl: '/images/news2.svg',
            date: "Apr. 12, 2024",
          },
          {
            id: 6,
            title: "Olamax Partners with Top Nigerian Banks to Streamline Crypto-to-Naira Conversions",
            description: "Through new partnerships with leading Nigerian banks, Olamax has enhanced its crypto conversion process, enabling faster settlements and ensuring a more seamless experience for users.",
            imageUrl: '/images/news3.svg',
            date: "Apr. 12, 2024",
          },
          {
            id: 7,
            title: "Olamax Launches New Escrow Service for Secure Transactions",
            description: "To enhance trust in peer-to-peer transactions, Olamax now offers a fully integrated escrow service, ensuring that funds are securely held until both parties complete their exchange, boosting security for users.",
            imageUrl: '/images/news1.svg',
            date: "Apr. 12, 2024",
        },
          {
            id: 8,
            title: "Olamax Now Supports Over 20 Cryptocurrencies, Expanding Your Options",
            description: "Olamax is excited to announce the addition of several new digital assets, providing users with even more options for converting cryptocurrencies into Naira and making cross-border payments easier than ever.",
            imageUrl: '/images/news2.svg',
            date: "Apr. 12, 2024",
          },
          {
            id: 9,
            title: "Olamax Partners with Top Nigerian Banks to Streamline Crypto-to-Naira Conversions",
            description: "Through new partnerships with leading Nigerian banks, Olamax has enhanced its crypto conversion process, enabling faster settlements and ensuring a more seamless experience for users.",
            imageUrl: '/images/news3.svg',
            date: "Apr. 12, 2024",
          },
      ];
      
    return (
        <div className="flex flex-row flex-wrap w-full mx-auto">
            {news.map((item) => (
                <div key={item.id} className="w-full md:w-1/3 space-y-4 p-5 text-textDark rounded-lg justify-end">
                    <img
                        src={item.imageUrl}
                        alt="photo"
                        className="w-full h-auto rounded-md object-fill"
                    />
                    <div className="text-wrap font-Inter space-y-2">
                        <h3 className="font-bold xl:text-[18px] xl:leading-[27px]">{item.title}</h3>
                        <p className="font-normal xl:text-[16px] xl:leading-[24px]">{item.description}</p>
                        <span className="text-textDark text-base block item-end">{item.date}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default News;
