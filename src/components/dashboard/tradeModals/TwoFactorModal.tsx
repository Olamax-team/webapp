import Modal from '../../ui/modal';
import { useTwoFactorModal, useVerifyCodeModal } from '../../../lib/utils'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../ui/input-otp';
import { useForm } from 'react-hook-form';
import { verficationSchema, verficationValues } from '../../../lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';


const TwoFactorModal = () => {
  const { isOpen, onClose } = useTwoFactorModal();
  const openVerifyCodeModal = useVerifyCodeModal();

  const defaultVerificationValues = {
    verificationCode: ''
  };

  const form = useForm<verficationValues>({
    resolver: zodResolver(verficationSchema),
    defaultValues: defaultVerificationValues
  });

  const onSubmitForm = (values:verficationValues) => {
    const { verificationCode } = values;

    const verifyData = {
      verify_email: verificationCode,
    };

    console.log(verifyData)
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      useCloseButton={false}
      title='Enter your Pin'
      modalSize='md:max-w-[540px] w-full'
      modalStyle='rounded p-6 xl:p-7'
    >
      <div className='flex flex-col gap-10 font-Inter'>
        <div>
          <p className='text-sm lg:text-base'>Kindly Input your secret 6-digit code to complete this transaction</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className='mt-5'>
              <FormField
                control={form.control}
                name='verificationCode'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className='w-full lg:h-[70px] md:h-[70px] h-[62px] gap-2 md:gap-3 xl:gap-4 font-inter'>
                          <InputOTPSlot index={0} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal'/>
                          <InputOTPSlot index={1} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                          <InputOTPSlot index={2} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                          <InputOTPSlot index={3} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                          <InputOTPSlot index={4} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                          <InputOTPSlot index={5} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div>
          <button className='w-full font-poppins h-12 rounded-lg bg-primary hover:bg-secondary text-white mt-6' onClick={() =>{onClose(); openVerifyCodeModal.onOpen();}}>
            Proceed
          </button>
          <p className='text-center mt-3 font-Inter'>Forgot Password? <button className='font-bold'>Contact Support</button></p>
        </div>
      </div>
    </Modal>
  )
}

export default TwoFactorModal