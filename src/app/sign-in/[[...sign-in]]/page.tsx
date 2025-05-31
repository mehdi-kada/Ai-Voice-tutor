import { SignIn } from '@clerk/nextjs'


function page() {
  return (
    <main className='flex items-center justify-center'>
        <SignIn />
    </main>
  )
}

export default page