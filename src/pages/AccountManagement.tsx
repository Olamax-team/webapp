import AccountMangementContent from "../components/dashboard/account-management/AccountMangementContent";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { documentTitle } from "../lib/utils";

const AccountManagement = () => {
  documentTitle('Account Management');

  return (
    <DashboardLayout>
      <AccountMangementContent/>
    </DashboardLayout>
  )
}

export default AccountManagement;