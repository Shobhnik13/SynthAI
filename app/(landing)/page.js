import Link from "next/link"
import {Button} from '@/components/ui/button'
const page = () => {
  return (
    <div>
      landing
      <div>
        <Link href={'/sign-in'}>
        <Button>Login</Button>
        </Link>
        <Link href={'/sign-up'}>
        <Button>Register</Button>
        </Link>
      </div>
    </div>
  )
}

export default page