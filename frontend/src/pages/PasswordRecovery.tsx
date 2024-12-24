import AuthLayout from '../components/layout/AuthLayout';
import { documentTitle } from '../lib/utils';

const PasswordRecovery = () => {
  documentTitle('Password Recovery')
  return (
    <AuthLayout>
      PasswordRecovery
    </AuthLayout>
  )
}

export default PasswordRecovery;