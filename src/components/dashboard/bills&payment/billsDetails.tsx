import AirtimeInput from '../bills&payment/billsInput/airtimeInput';
import DataInput from '../bills&payment/billsInput/dataInput';
import arrow from '../../../assets/images/arrow-left.png'
import ElectricityInput from './billsInput/eletricityInput';
import CableTvInput from '../bills&payment/billsInput/cableTvInput';
import BettingInput from '../bills&payment/billsInput/bettingInput';
import WaterInput from '../bills&payment/billsInput/waterInput';
import CoweryInput from '../bills&payment/billsInput/coweryInput';
import { activityIndex } from '../../../stores/generalStore';

type billsDetailsProps = {
  activeInput: string;
};

const BillsDetails = ({activeInput }: billsDetailsProps) => {
  const { setShowTransactionDetail } = activityIndex();

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
