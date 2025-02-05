import AccountSettings from "./AccountSettings"
import NameHeader from "./NameHeader"
import SecuritySettings from "./SecuritySettings"

const AccountMangementContent = () => {

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full">
        <h2 className="font-DMSans font-bold lg:text-[26px] leading-normal text-[20px]">Profile Management</h2>
        <p className="font-Inter text-sm">This process helps protect your account & allows for seamless trading.</p>
      </div>
      <NameHeader/>
      <AccountSettings/>
      <SecuritySettings/>
    </div>
  )
}

export default AccountMangementContent