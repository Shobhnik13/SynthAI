import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./mobile-sidebar"
import { getApiLimit } from "../app/constants/api-limit"
import { checkSubs } from "../lib/subscription"

const Navbar = async() => {
  const apiLimitCount=await getApiLimit()
  const isPro=await checkSubs()
  return (
    <div className="flex items-center p-4">
        <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
        <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Navbar