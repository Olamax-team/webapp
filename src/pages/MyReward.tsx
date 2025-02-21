import DashboardLayout from "../components/dashboard/DashboardLayout"
import MyRewardContent from "../components/dashboard/my-reward/MyRewardContent"
import { documentTitle } from "../lib/utils";

const MyReward = () => {
  documentTitle('Rewards');

  return (
    <DashboardLayout>
      <MyRewardContent/>
    </DashboardLayout>
  )
}

export default MyReward