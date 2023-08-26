'use client'
// this use client will create a boundary between server and client comp module graph 
import { Montserrat } from "next/font/google"
import FreeCounter from "./free-counter"
import Image from "next/image"
import Link from "next/link"
import { cn } from "../lib/utils"
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react"
import {usePathname} from 'next/navigation'
const monsterat=Montserrat({ weight:'600',subsets:['latin']})
const routes=[
  {
    label:'Dashboard',
    icon:LayoutDashboard,
    href:'/dashboard',
    color:'text-sky-500'
  },
  {
    label:'Conversation',
    icon:MessageSquare,
    href:'/conversation',
    color:'text-violet-500'
  },
  {
    label:'Image Generation',
    icon:ImageIcon,
    href:'/image',
    color:'text-pink-700'
  },
  {
    label:'Video Generation',
    icon:VideoIcon,
    href:'/video',
    color:'text-orange-700'
  },
  {
    label:'Music Generation',
    icon:Music,
    href:'/music',
    color:'text-emerald-500'
  },
  {
    label:'Code Generation',
    icon:Code,
    href:'/code',
    color:'text-green-700'
  },
  {
    label:'Settings',
    icon:Settings,
    href:'/settings',
  },
]
interface SidebarProps{
  apiLimitCount:number,isPro:boolean
}
const Sidebar = ({apiLimitCount=0,isPro=false}:SidebarProps) => {
  // this usepathname will return the STRING of the current path we are standing at ie->/dashboard
  const pathname=usePathname()
  return (
    // div for full sidebar thing 
    <div className="space-y-4 flex flex-col h-full bg-[#111827] text-white">
        {/* div for logo and name and routes map and free counter   */}
          <div className="px-3 py-2 flex-1">

            {/* link for name and logo  */}
            <Link href={'/dashboard'} className="flex items-center pl-3 mb-14 mt-4">
             
              {/* logo div */}
              <div className="relative w-8 h-8 mr-4">
                  <Image fill alt="logo" src={'/logo.png'}/>
              </div>
             
                {/* name  */}
              <h1 className={cn("text-2xl font-bold ",monsterat.className)}>SynthAI</h1>
            </Link>

            {/* route map  */}
            <div className="space-y-1">
              {routes.map((item)=>{
                return(
                  <Link 
                  href={item.href}
                  key={item.href}
  className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",pathname === item.href ? 'text-white bg-white/10' :' text-zinc-400')}>                
                    <div className="flex items-center flex-1">
                        <item.icon className={cn("h-5 w-5 mr-3",item.color)}/>
                        {item.label}
                    </div>
                  </Link>
                )
              })}
            </div>
            {/* free counter  */}
              <div className="mt-14">
            <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount}/>
            </div>
          </div>
    </div>
  )
}

export default Sidebar