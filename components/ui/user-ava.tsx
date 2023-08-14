import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

const UserAva = () => {
    const { user }=useUser()
  return (
        <Avatar className="h-8 w-8 ">
            <AvatarImage className="rounded-full" src={user?.profileImageUrl}/>
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
  )
}

export default UserAva