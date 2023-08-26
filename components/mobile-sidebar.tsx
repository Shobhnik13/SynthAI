'use client'
interface MobileSidebarProps{
    apiLimitCount:number,
    isPro:boolean,
}
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Sidebar from "./sidebar"
import { useEffect, useState } from "react"

const MobileSidebar = ({apiLimitCount=0,isPro=false}:MobileSidebarProps) => {
//    3 step process to fix components having hydration error 

// step-1 -> make the mounted state as false 
    const [isMounted,setIsMounted]=useState(false)
// step-2 -> set the mounted state true in useefect 
    useEffect(()=>{
        setIsMounted(true)
    },[])
// step-3->return null if there is no is mounted 
    if(!isMounted){
    return null;        
    }
    
  return (
        <Sheet>
            {/* button contains toggle icon ->visible only in mobiles  */}
            {/* we will wrap SheetTrigger in sheet  */} 
            {/* we will wrap the button(toggle)in SheetTrigger  */}
            <SheetTrigger className="">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
                {/* sheet content to render sidebar  */}
                <SheetContent className="p-0" side="left" ><Sidebar apiLimitCount={apiLimitCount} isPro={isPro} /></SheetContent>
        </Sheet>
  )
}

export default MobileSidebar