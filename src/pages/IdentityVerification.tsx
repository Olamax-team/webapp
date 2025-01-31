import DashboardLayout from "../components/dashboard/DashboardLayout"
import VerificationContent from "../components/dashboard/identity-verification/VerificationContent";
import { documentTitle } from "../lib/utils";


const IdentityVerification = () => {
  documentTitle('Identity Verification');

  return (
    <DashboardLayout>
      <VerificationContent/>
    </DashboardLayout>
  )
}

export default IdentityVerification