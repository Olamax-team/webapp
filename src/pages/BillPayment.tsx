import DashboardLayout from "../components/dashboard/DashboardLayout";
import Bills from "../components/dashboard/bills&payment/bills";
import { documentTitle } from "../lib/utils";

const BillPayment = () => {
  documentTitle('Bills & Payment');

  return (
    <DashboardLayout>
      <Bills />
    </DashboardLayout>
  )
}

export default BillPayment;