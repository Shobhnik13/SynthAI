'use client'

import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Sidebar from "./sidebar"

const MobileSidebar = () => {
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
                <SheetContent className="p-0" side="left" ><Sidebar/></SheetContent>
        </Sheet>
  )
}

export default MobileSidebar