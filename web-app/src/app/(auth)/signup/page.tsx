import SignupForm from '@/components/form/SignupForm';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <section className='w-2/9'>
        <div>
            <h1>Create new account</h1>
        </div>
        <SignupForm />
        <p className='p-1 mt-3'>
            Already have an account?..
            <Link href="/signin">Sign in</Link>
        </p>
    </section>
  )
}

export default SignupPage