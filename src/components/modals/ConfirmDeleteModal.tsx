import Modal from '../ui/modal'
import { useConfirmDeleteModal } from '../../lib/utils'
import useUserDetails from '../../stores/userStore';
import { useApiConfig } from '../../hooks/api';
import axios from 'axios';
import { useToast } from '../../hooks/use-toast';


const ConfirmDeleteModal = () => {
  const { toast } = useToast();
  const { isOpen, onClose } = useConfirmDeleteModal();

  const { user, clearUser } = useUserDetails();

  const deleteConfig = useApiConfig({
    method: 'get',
    url: 'delete-my-account'
  });

  const deleteAccount = async () => {
    if (user) {
      axios.request(deleteConfig)
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: 'Success',
            description: 'Account successfully deleted!!',
            variant: 'success'
          })
          clearUser();
          onClose();
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Delete Account'
      modalSize='md:max-w-[540px] w-full'
    >
      <div className='flex flex-col gap-10'>
        <p className='text-sm lg:text-base'>Permanently remove your account and all associated data. This action cannot be undone, so please ensure you want to proceed.</p>
        <div className="flex items-center justify-between gap-4">
          <button className='w-full h-12 rounded-lg bg-[#E41D03] text-white' onClick={deleteAccount}>
            Yes
          </button>
          <button className='w-full h-12 rounded-lg border-primary border text-primary' onClick={() =>onClose()}>
            No
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDeleteModal