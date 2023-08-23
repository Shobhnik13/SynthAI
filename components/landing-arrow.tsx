'use client'


import { ArrowBigUp } from "lucide-react"
import Link from "next/link"

const LandingArrow = () => {
  return (
    <div className="flex justify-end items-center px-4 py-2 mr-4">
        <Link href={'/'}>
        <div onClick={()=>window.scrollTo(0,0)} className=" rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-bounce p-4 -mt-10">
        <ArrowBigUp className="text-white fill-white"/>
        </div>
        </Link>
    </div>
  )
}

export default LandingArrow