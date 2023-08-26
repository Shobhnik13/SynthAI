'use client'

import { Zap } from "lucide-react"
import { Button } from "./ui/button"
import axios from "axios"
import { useState } from "react"
import {toast} from 'react-hot-toast'



interface SubsButtonProps{
    isPro:boolean,
}
const SubsButton = ({isPro=false}:SubsButtonProps) => {
    const [loading,setLoading]=useState(false)
    const onClick=async()=>{
        try{
            setLoading(true)
            const res=await axios.get('/api/stripe')
            window.location.href=res.data.url
        }catch(error){
            toast.error('Something went wrong!')
            // console.log('BILLING ERROR:',error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <Button onClick={onClick} disabled={loading} variant={isPro?'default':'premium'}>
        {isPro?'Manage subscription':'Upgrade to PRO'}
        {!isPro && <Zap className="w-4 h-4 fill-white text-white ml-2"/>}
    </Button>
  )
}

export default SubsButton