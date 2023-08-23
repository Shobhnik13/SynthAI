'use client'
import { useAuth } from "@clerk/nextjs"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

const font =Montserrat({
    weight:"600",
    subsets:["latin"]
})
const LandingNavbar = () => {
    // useAuth will act same as auth 
    // BUTTT usAuth can pnly be used in client components and auth can only be used in server components
    // useAuth will give the current auth state user and session ids
    const {isSignedIn}=useAuth()
    return (
    <nav className="p-4 flex items-center justify-between">
        {/* nav will contain left div -> link(logo+h1) and a right div (button) */}

        {/* left div -> link contains an image div and h1 tag */}
        <Link href={'/'} className="flex items-center">
            {/* image div  */}
            <div className="relative h-8 w-8 mr-4">
                <Image src={'/logo.png'} fill className="" alt="logo"/>
            </div>
            {/* h1 tag  */}
            <h1 className={cn("text-3xl font-bold ",font.className)}>SynthAI</h1>
        </Link>

        {/* right div -> buttons */}
        <div className="flex items-center gap-x-2 relative ">
            <Link href={isSignedIn?'/dashboard':'/sign-up'}>
                <Button variant="outline" className=" rounded-full text-lg hover:scale-90 duration-90 transition-all" >Get Started</Button>
                <span className=" animate-ping -left-4 -top-4 relative inline-flex rounded-full h-3 w-3 bg-sky-500 duration-1000"></span>
            </Link>
        </div>
    </nav>
  )
}

export default LandingNavbar