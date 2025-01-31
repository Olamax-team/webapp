import DashboardLayout from "../components/dashboard/DashboardLayout"
import DashboardTab from "../components/dashboard/DashboardTabs"
import { documentTitle } from "../lib/utils";



const Dashboard = () => {
  documentTitle('Dashboard');

  return (
    <DashboardLayout>
      <DashboardTab/>
    </DashboardLayout>
  )
}

export default Dashboard