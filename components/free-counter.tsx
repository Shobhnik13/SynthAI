'use client'

import { useEffect, useState } from "react"

interface FreeCounterProps{
  apiLimitCount:number
}
const FreeCounter = ({apiLimitCount=0}:FreeCounterProps) => {
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
  return (
    <div>free-counter</div>
  )
}

export default FreeCounter