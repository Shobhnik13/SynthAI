import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

const BotAva = () => {
  return (
    <Avatar className="w-8 h-8 " >
        <AvatarImage src={'/logo.png'} />
    </Avatar>
  )
}

export default BotAva