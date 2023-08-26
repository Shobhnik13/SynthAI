'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { FREE_TIER_COUNT } from "../app/constants/constants"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { Zap } from "lucide-react"
import { useProModal } from "../hooks/pro-modal"

interface FreeCounterProps{
  apiLimitCount:number,
  isPro:boolean
}
const FreeCounter = ({apiLimitCount=0,isPro=false}:FreeCounterProps) => {
  const proModalStates=useProModal()
  // s1 
  const [mounted,setMounted]=useState(false)
  
  // s2 
  useEffect(()=>{
    setMounted(true)
  },[])

  // s3 
  if(!mounted){
    return null;
  }
  //is already a pro then dont show counter
  if(isPro){
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6 ">
          <div className="text-center text-sm text-white mb-2 space-y-2">
            <p>{apiLimitCount} / {FREE_TIER_COUNT} Free Generations</p>
            <Progress className="h-3 " value={(apiLimitCount/FREE_TIER_COUNT)*100}/>
          </div>
          <Button variant="premium" onClick={proModalStates.onOpen} className="w-full hover:scale-90 duration-200 transition-all">Upgrade <Zap className="w-4 h-4 ml-2 fill-white text-white border-none "/></Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeCounter