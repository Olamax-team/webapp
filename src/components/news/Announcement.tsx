import avatar from "../../app-assets/images/posterAvatar.svg"
import avatar1 from "../../app-assets/images/posterAvatar1.svg"
interface Announce {
    id: number;
    text: string;
    link: string;
    date: string;
    poster: string;
    posterAvatar: string;
}

const Announcement =() => {

    const announcement: Announce[] = [
        {
            id: 1,
            text: "GET MORE VALUE FOR YOUR USDT AND BTC WHEN YOU BUY OR SELL USDT/BTC AND EARN BONK TOKEN. PROMO STARTS FROM 6TH OF MARCH TILL 6TH OF APRIL.",
            link:"",
            poster: "Admin",
            posterAvatar: avatar,
            date: "24/11/2024",
        },
        {
            id: 2,
            text: "ENJOY LOWER FEES ON ALL CRYPTO TRANSACTIONS WHEN YOU TRADE ETH AND LTC. SPECIAL DISCOUNT RUNS FROM 1ST OF NOVEMBER TO 1ST OF DECEMBER.",
            link:"",
            poster: "Admin",
            posterAvatar: avatar,
            date: "24/11/2024",
        },
        {
            id: 3,
            text: "TRADE YOUR CRYPTO SECURELY AND EARN REWARDS ON EVERY BTC AND DOGE TRANSACTION. PROMO RUNS FROM 10TH OF OCTOBER TO 10TH OF NOVEMBER.",
            link:"",
            poster: "Admin",
            posterAvatar: avatar1,
            date: "24/11/2024",
        },
      ];
    return (
        <div className="w-full xl:relative flex flex-col xl:flex-row flex-wrap gap-4 mx-auto my-7 xl:my-auto">
            {announcement.map((item) => (
                <div key={item.id} className="w-full text-textDark p-3 bg-white rounded-lg font-Inter space-y-6">
                    <h3 className="xl:text-sm font-normal">{item.text} FOR MORE INFO, <a href={item.link} className="text-primary underline cursor-pointer">CLICK HERE</a></h3>
                    <span className="flex gap-3 p-4 pl-0 items-center">
                        <img
                            src={item.posterAvatar}
                            alt="Poster avatar"
                            className="w-6 h-6 object-cover"
                        />
                        <p className="font-medium text-[12px] xl:text-sm leading-[18px]">Posted by {item.poster} | {item.date}</p>
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Announcement;