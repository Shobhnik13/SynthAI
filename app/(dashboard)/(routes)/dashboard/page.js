import { UserButton } from "@clerk/nextjs"

const page = () => {
  return (
    <div>dashboard
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default page