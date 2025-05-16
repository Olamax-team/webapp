import { activityIndex } from "../../stores/generalStore";
import BuyInput from "./tradeInput/buyInput";
import SellInput from "./tradeInput/sellInput";

type tradeDetailsProps = {
    activeInput: string;
  };

  const TradeDetails = ({ activeInput }: tradeDetailsProps) => {
  const {  setShowTransactionDetail } = activityIndex();
  
    const renderInput = () => {
      switch (activeInput) {
        case 'buy':
          return <BuyInput/>
        case 'sell':
          return <SellInput/>;
        default:
          return;
      }
    };
  
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