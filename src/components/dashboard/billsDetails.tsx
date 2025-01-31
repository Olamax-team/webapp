import AirtimeInput from './billsInput/airtimeInput';
import DataInput from './billsInput/dataInput';
import arrow from '../../assets/images/arrow-left.png'
import ElectricityInput from './billsInput/eletricityInput';
import CableTvInput from './billsInput/cableTvInput';
import BettingInput from './billsInput/bettingInput';
import WaterInput from './billsInput/waterInput';
import CoweryInput from './billsInput/coweryInput';

type billsDetailsProps = {
  setShowTransactionDetail: React.Dispatch<React.SetStateAction<boolean>>;
  activeInput: string;
};

const BillsDetails = ({ setShowTransactionDetail, activeInput }: billsDetailsProps) => {
  const renderInput = () => {
    switch (activeInput) {
      case 'airtime':
        return <AirtimeInput />;
      case 'data':
        return <DataInput />;
      case 'electricity':
        return <ElectricityInput />;
      case 'cabletv':
        return <CableTvInput />;
      case 'betting':
        return <BettingInput />;
      case 'water':
        return <WaterInput />;
      case 'cowry':
        return <CoweryInput />;
      default:
        return;
    }
  };
  console.log(renderInput)

  return (
    <div className="flex flex-col h-auto w-full">
      <button className='flex gap-4 text-black/50 items-center' onClick={() => setShowTransactionDetail(false)}>  
        <div className="size-[20px]">
          <img src={arrow} alt="arrow_icon" />
        </div>
        Back
      </button>

      <div>
        {renderInput()}
      </div>
    </div>
  );
};

export default BillsDetails;
