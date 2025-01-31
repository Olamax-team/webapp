<<<<<<< HEAD
import DashboardLayout from '../components/dashboard/DashboardLayout'
// import DashboardTab from '../components/dashboard/dashboardTabs'
import DashboardTab from '../components/dashboard/DashboardTabs';
=======
import DashboardLayout from "../components/dashboard/DashboardLayout"
import DashboardTab from "../components/dashboard/DashboardTabs"
import { documentTitle } from "../lib/utils";

>>>>>>> a77aafe8d502a364c98e3f19debf4f748aa277f1


const Dashboard = () => {
  documentTitle('Dashboard');

  return (
    <DashboardLayout>
      <DashboardTab/>
    </DashboardLayout>
  )
}

export default Dashboard