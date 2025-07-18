import Modal from '../ui/modal'
import { useReviewsModal } from '../../lib/utils'

const ReviewsModal = () => {
  const { isOpen, onClose } = useReviewsModal();
  return (
    <Modal
      title='What Do you think about Our Service?'
      isOpen={isOpen}
      onClose={onClose}
      useCloseButton
      modalSize='max-w-[500px] w-full'
    >
      <div className="mt-6 flex flex-col gap-6">
        <textarea className='w-full h-[150px] resize-none border rounded-md outline-none focus:outline-none p-3 text-sm' placeholder='Enter a review'/>
        <button type="button" className='px-6 h-10 rounded-md bg-primary text-white capitalize'>Send</button>
      </div>
    </Modal>
  )
}

export default ReviewsModal