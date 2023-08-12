'use client'

import { useRouter } from "next/navigation"
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react"
import { Card } from "../../../../components/ui/card"
import { cn } from "../../../../lib/utils"

const tools=[
  {
    label:'Conversation',
    icon:MessageSquare,
    color:'text-violet-500',
    bgColor:'bg-violet-500/10',
    href:'/conversation'
  },
  {
    label:'Music Generation',
    icon:Music,
    color:'text-emerald-500',
    bgColor:'bg-emerald-500/10',
    href:'/music'
  },
  {
    label:'Image Generation',
    icon:ImageIcon,
    color:'text-pink-700',
    bgColor:'bg-pink-700/10',
    href:'/image'
  },
  {
    label:'Video Generation',
    icon:VideoIcon,
    color:'text-orange-700',
    bgColor:'bg-orange-700/10',
    href:'/video'
  },
  {
    label:'Code Generation',
    icon:Code,
    color:'text-green-700',
    bgColor:'bg-violet-700/10',
    href:'/code'
  },

]
const DashboardPage = () => {
  const router=useRouter()
  return (
    <div>
      {/* div for h2 and p  */}
    <div className="mb-8 space-y-4">
      
      <h2 className="text-2xl md:text-4xl text-center font-bold">
          Explore the power of AI
      </h2>

        <p className="text-muted-foreground text-sm md:text-lg font-light text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>

    </div>
    {/* div for features/tools  */}
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((item)=>{
            return(
              <Card onClick={()=>router.push(item.href)} key={item.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                    {/* div for logo/icon and title  */}
                  <div className="flex items-center gap-x-4">
                    {/* div for icon/logo ->1 */}
                    <div className={cn("p-4 w-fit rounded-md",item.bgColor)}>
                        <item.icon className={cn("w-8 h-8",item.color)}/>
                    </div>
                    {/* div for title -> 2 */}
                    <div className="font-semibold">
                      {item.label}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5"/>
              </Card>
            )
          })}
      </div>

    </div>
  )
}

export default DashboardPage