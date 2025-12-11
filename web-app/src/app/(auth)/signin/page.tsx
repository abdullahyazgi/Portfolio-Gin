import SigninForm from '@/components/form/SigninForm';
import Link from 'next/link';

const SigninPage = () => {
  return (
    <section className='w-2/9'>
        <div>
            <h1>Welcome to Sign in</h1>
        </div>
        <SigninForm />
        <p className='p-1 mt-3'>
            Do not have an account?..
            <Link href="/signup">Sign up</Link>
        </p>
    </section>
  )
}

export default SigninPage