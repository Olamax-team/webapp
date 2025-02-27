import BuyInput from "./tradeInput/buyInput";
// import arrow from '../../assets/images/arrow-left.png'
import SellInput from "./tradeInput/sellInput";

type tradeDetailsProps = {
    setShowTransactionDetail: React.Dispatch<React.SetStateAction<boolean>>;
    activeInput: string;
  };

  const TradeDetails = ({ setShowTransactionDetail, activeInput }: tradeDetailsProps) => {
    const renderInput = () => {
      switch (activeInput) {
        case 'Buy':
          return <BuyInput/>
        case 'Sell':
          return <div><SellInput/></div>;
        default:
          return;
      }
    };
    console.log(renderInput)
  
    return (
      <div className="flex flex-col h-auto w-full">
        <button className='flex gap-4 text-black/50 items-center' onClick={() => setShowTransactionDetail(false)}>  
          <div className="size-[20px]">
            <img src={"/images/arrow-left.png"} alt="arrow_icon" />
          </div>
          Back
        </button>
  
        <div>
          {renderInput()}
        </div>
      </div>
    );
  };

  export default TradeDetails;