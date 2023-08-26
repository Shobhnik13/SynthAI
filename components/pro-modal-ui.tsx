'use client'

import { Check, Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon, Zap } from "lucide-react"
import { useProModal } from "../hooks/pro-modal"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Card } from "./ui/card"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import {toast} from 'react-hot-toast'

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
  const ProModalUi = () => {
    const proStoreStates=useProModal()
    const [loading,setLoading]=useState(false)
    const onSub=async()=>{
      try{
        setLoading(true)
        const res=await axios.get('/api/stripe')
        // window.location.href will locate to the desired url ie setting page that is coming as a response from api
        window.location.href=res.data.url
      }catch(error){
        // console.log(error,'stripe client error')
          toast.error('Something went wrong!')
      }finally{
          setLoading(false)
        }
    }
  return (
   <Dialog open={proStoreStates.isOpen} onOpenChange={proStoreStates.onClose}>
      <DialogContent>
        {/* dialog content contains a dialog header/footer  */}
        <DialogHeader>
          {/* dialog header contains a dilogtite and dilog desc  */}

            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                {/* all divs in a col  */}
                {/* div1 -> badge + heading  (in row)*/}
                <div className="flex items-center justify-center gap-x-2 font-bold py-1">
                    Upgrade to SynthAI
                    <Badge variant="premium" className="text-sm py-1">PRO</Badge>
                </div>
            </DialogTitle>

            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {
                        tools.map((item)=>(
                            <Card
                            key={item.label}
                            className="p-3 border-black/5 flex items-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    {/* div for label and icon in a row */}

                                    {/* wrapper div of icon for bg color-div1  */}
                                    <div className={cn("p-2 w-fit rounded-md",item.bgColor)}>
                                        <item.icon className={cn("w-6 h-6",item.color)}/>
                                    </div>

                                    {/* div for label- div2 */}
                                    <div className="text-sm font-semibold">
                                        {item.label}
                                    </div>
                                </div>

                                    {/* check icon-outside of the label and icon justify div coz we want at end of the whole card div  */}
                                    <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))
                     } 
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSub} variant="premium" className="text-white w-full" size="lg">
            Upgrade
            <Zap className="fill-white w-4 h-4 ml-2 border-none"/>
          </Button>
        </DialogFooter>
      </DialogContent>
   </Dialog>
  )
}

export default ProModalUi